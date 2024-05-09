import { BaseSyntheticEvent, FC, useEffect, useState } from "react";
import "../BookingPage/BookingPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  Movie,
  Session,
  TOrder,
  useGetFilmsQuery,
  useGetOrdersQuery,
  useGetSessionsQuery,
  useLazyGetOrdersQuery,
} from "../../store/api";
import { Seat, TSessionSeats } from "./Seat";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetSelectedSeats } from "../../store/modal";
import axios from "axios";
import { BASE_URL } from "../App/App";

export const BookingPage: FC = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { filmId } = useParams();
  const sessions = useGetSessionsQuery("").data;
  const films = useGetFilmsQuery("").data;
  const orders = useGetOrdersQuery("").data;
  const [filmSessions, setFilmSessions] = useState<Session[]>([
    {
      _id: "",
      movieId: "",
      date: "",
      time: "",
    },
  ]);
  const [currentSession, setCurrentSession] = useState<Session>();
  const [currentOrders, setCurrentOrders] = useState<TOrder[]>();
  const selectedSeats = useAppSelector((state) => state.modal.selectedSeats);
  const [sessionSeats, setSessionsSeats] = useState<TSessionSeats>({
    userSeats: [],
    busySeats: [],
  });
  const [currentFilm, setCurrentFilm] = useState<Movie>({
    _id: "",
    title: "",
    description: "",
    country: "",
    genre: "",
    restriction: 0,
    releaseDate: "",
    actors: [],
    videoId: "",
    imgPath: "",
  });
  const getSeats = () => {
    const seats = [];
    for (let i = 1; i <= 72; i++) {
      seats.push({ id: String(i) });
    }
    return seats;
  };

  useEffect(() => {
    if (!sessions) return;
    const firstFilmSession = sessions.find(
      (session) => session.movieId === filmId
    );
    setCurrentSession(firstFilmSession);
  }, [sessions]);

  useEffect(() => {
    if (!sessions || !films || !orders) return;
    const filmSessions = sessions.filter(
      (session) => session.movieId === filmId
    );
    const currentFilm = films.find(({ _id }) => _id === filmId);
    if (currentFilm) setCurrentFilm(currentFilm);
    setFilmSessions(filmSessions);

    const currentOrders = orders.filter(
      (order) => order.sessionId === currentSession?._id
    );
    setCurrentOrders(currentOrders);
  }, [sessions, currentSession, orders]);

  useEffect(() => {
    if (!currentOrders) return;
    const user = JSON.parse(String(localStorage.getItem("userData")));
    if (user) {
      const seats = currentOrders.reduce(
        (acc: any, order) => {
          if (user.id === order.userId) {
            order.numberSeats.forEach((seat) => {
              acc.userSeats.push(seat);
            });
            return acc;
          } else {
            order.numberSeats.forEach((seat) => {
              acc.busySeats.push(seat);
            });
            return acc;
          }
        },
        { userSeats: [], busySeats: [] }
      );
      setSessionsSeats(seats);
    } else {
      navigation("/auth/login");
    }
  }, [currentOrders]);

  const changeSession = (id: string) => {
    if (!sessions) return;
    const currentSession = sessions.find((session) => id === session._id);
    dispatch(resetSelectedSeats());
    setCurrentSession(currentSession);
  };

  const [refreshOrders] = useLazyGetOrdersQuery();

  const tryPayTickets = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    const user = JSON.parse(String(localStorage.getItem("userData")));
    if (!user && selectedSeats.length && currentSession?._id) return;
    const payData = {
      userId: user.id,
      sessionId: currentSession?._id,
      numberSeats: selectedSeats,
      price: selectedSeats.length * 10,
    };
    const res = await axios.post(`${BASE_URL}/order`, payData);
    refreshOrders("");
    dispatch(resetSelectedSeats());
  };
  return (
    <div className="app__bookingPage">
      <div className="bookingPage__filmDataBlock">
        <img
          className="filmDataBlock__img"
          src={currentFilm.imgPath}
          alt="poster"
        />
        <div className="filmDataBlock__filmInfoBlock">
          <h3 className="filmInfoBlock__title">
            <span>{currentFilm.title}</span> | {currentFilm.restriction}+ |{" "}
            {currentFilm.country}
          </h3>
          <div className="filmInfoBlock__sessionsBlock">
            {filmSessions.map(({ _id, date, time }) => (
              <div
                key={_id}
                onClick={() => changeSession(_id)}
                className={`sessionsBlock__filmSession ${
                  currentSession?._id === _id && "active"
                }`}
              >
                <p className="filmSession__text">
                  {date.slice(8, 10)}.{date.slice(5, 7)} (<span>{time}</span>)
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bookingPage__bookingSection">
        <div className="bookingSection__cinemaHallBlock">
          <div className="cinemaHallBlock__seatsBlock">
            {getSeats().map(({ id }) => (
              <Seat key={id} id={id} sessionSeats={sessionSeats} />
            ))}
          </div>
          <div className="cinemaHallBlock__screen"></div>
        </div>
        <form className="bookingSection__bookingForm">
          <h3 className="bookingForm__title">Tickets Checkout</h3>
          <p className="bookingForm__seats">
            <span>Seats:</span> {selectedSeats.join(", ")}
          </p>
          <button onClick={tryPayTickets} className="bookingForm__payBtn">
            Pay {selectedSeats.length * 10}$
          </button>
        </form>
      </div>
    </div>
  );
};
