import { FC, useEffect, useState } from "react";
import "../FilmPage/FilmPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Movie, useGetFeedbacksQuery, useGetFilmQuery } from "../../store/api";
import { useAppDispatch } from "../../store/hooks";
import { setIsActive } from "../../store/navList";
import { ActorCard } from "./ActorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactComponent as Star } from "../../svg/star.svg";

export const FilmPage: FC = () => {
  const params = useParams();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useGetFilmQuery(String(params.filmId));
  const feedbacks = useGetFeedbacksQuery("").data;
  const [filmRating, setFilmRating] = useState<number>(0);
  const [currentFilm, setCurrentFilm] = useState<Movie>({
    _id: "",
    title: "",
    description: "",
    country: "",
    genre: "",
    restriction: 0,
    releaseDate: "",
    actors: [],
    videoPath: "",
    imgPath: "",
  });

  useEffect(() => {
    dispatch(setIsActive(-1));
  }, []);

  useEffect(() => {
    if (!currentFilm._id) return;
    const movieFeedbacks = feedbacks?.filter(
      ({ movieId }) => movieId === currentFilm._id
    );
    if (!movieFeedbacks || !movieFeedbacks.length) {
      setFilmRating(0);
      return;
    }
    const ratingsSum = movieFeedbacks.reduce((acc, feedback) => {
      return (acc += feedback.rating);
    }, 0);
    setFilmRating(+(ratingsSum / movieFeedbacks.length).toFixed(1));
  }, [currentFilm]);

  useEffect(() => {
    if (data) setCurrentFilm(data);
  }, [data]);

  const openBookingPage = () => {
    navigation(`/booking/${currentFilm._id}`);
  };

  return (
    <div className="app__filmPage">
      <video
        className="filmPage__trailerVideo"
        src={currentFilm.videoPath}
        controls
      ></video>
      <div className="filmPage__detailedInfo">
        <img
          className="detailedInfo__posterImg"
          src={currentFilm.imgPath}
          alt="poster"
        />
        <div className="detailedInfo__filmData">
          <h2 className="filmData__title">
            <span>{currentFilm.title}</span> | {currentFilm.restriction}+ |{" "}
            {filmRating}
            <Star className="title__star" />
          </h2>
          <p className="filmData__description">
            <span className="description__span">About</span>{" "}
            {currentFilm.description}
          </p>
          <p className="filmData__releaseDate filmData__text">
            <span className="releaseDate__span filmData__span">
              Release Date:
            </span>{" "}
            {currentFilm.releaseDate}
          </p>
          <p className="filmData__genre filmData__text">
            <span className="genre__span filmData__span">Genre: </span>
            {currentFilm.genre}
          </p>
          <p className="filmData__country filmData__text">
            <span className="country__span filmData__span">Country:</span>{" "}
            {currentFilm.country}
          </p>
          <button onClick={openBookingPage} className="filmData__bookBtn">
            Booking Ticket
          </button>
        </div>
      </div>

      <div className="filmPage__actorsSwiperBlock">
        <h2 className="actorsSwiperBlock__title">Actors</h2>
        <Swiper className="actorsSwiperBlock__actorsSwiper" slidesPerView={6.5}>
          {currentFilm.actors.map(({ actorId, role }) => (
            <SwiperSlide key={actorId}>
              <ActorCard key={actorId} actorId={actorId} role={role} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
