import { FC, useEffect, useState } from "react";
import { useGetFilmsQuery, useGetSessionsQuery } from "../../../store/api";

interface ITicket {
  ticketId: string;
  sessionId: string;
  numberSeats: string[];
  price: number;
}

export const Ticket: FC<ITicket> = ({
  ticketId,
  sessionId,
  numberSeats,
  price,
}) => {
  const sessions = useGetSessionsQuery("").data;
  const films = useGetFilmsQuery("").data;
  const [filmTitle, setFilmTitle] = useState<string>("");
  const [sessionTime, setSessionTime] = useState<string>("");

  useEffect(() => {
    if (!sessions || !films) return;
    const currentSession = sessions.find(
      (session) => session._id === sessionId
    );
    if (currentSession) setSessionTime(currentSession.time);
    const currentFilm = films.find(
      (film) => film._id === currentSession?.movieId
    );
    if (currentFilm) setFilmTitle(currentFilm.title);
  }, [sessions, films]);

  return (
    <div className="orderHistoryPage__orderTicket">
      <div className="orderTicket__leftPart">
        <p className="leftPart__ticketId">{ticketId}</p>
      </div>
      <div className="orderTicket__centerCut">
        <div className="centerCut__topCut"></div>
        <div className="centerCut__line"></div>
        <div className="centerCut__line"></div>
        <div className="centerCut__line"></div>
        <div className="centerCut__line"></div>
        <div className="centerCut__line"></div>
        <div className="centerCut__line"></div>
        <div className="centerCut__line"></div>
        <div className="centerCut__line"></div>
        <div className="centerCut__line"></div>
        <div className="centerCut__line"></div>
        <div className="centerCut__line"></div>

        <div className="centerCut__bottomCut"></div>
      </div>
      <div className="orderTicket__rightPart">
        <h4 className="rightPart__title">
          {filmTitle} ({sessionTime})
        </h4>
        <p className="rightPart__seats">seats: {numberSeats.join(",")}</p>
        <p className="rigthPart__price">{price}$</p>
      </div>

      <div className="orderTicket__leftCutsBlock">
        <div className="leftCutsBlock__cut"></div>
        <div className="leftCutsBlock__cut"></div>
        <div className="leftCutsBlock__cut"></div>
        <div className="leftCutsBlock__cut"></div>
        <div className="leftCutsBlock__cut"></div>
        <div className="leftCutsBlock__cut"></div>
      </div>
      <div className="orderTicket__rightCutsBlock">
        <div className="rightCutsBlock__cut"></div>
        <div className="rightCutsBlock__cut"></div>
        <div className="rightCutsBlock__cut"></div>
        <div className="rightCutsBlock__cut"></div>
        <div className="rightCutsBlock__cut"></div>
        <div className="rightCutsBlock__cut"></div>
      </div>
    </div>
  );
};
