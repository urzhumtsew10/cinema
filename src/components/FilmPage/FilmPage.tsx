import { FC, useEffect, useState } from "react";
import "../FilmPage/FilmPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Movie, useGetFeedbacksQuery, useGetFilmQuery } from "../../store/api";
import { useAppDispatch } from "../../store/hooks";
import { setIsActive } from "../../store/navList";
import { ActorCard } from "./ActorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactComponent as Star } from "../../svg/star.svg";
import YouTube from "react-youtube";

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
    videoId: "",
    imgPath: "",
  });

  useEffect(() => {
    dispatch(setIsActive(-1));
    window.scrollTo({ top: 0 });
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

  console.log(currentFilm);

  return (
    <div className="app__filmPage">
      <YouTube
        className="filmPage__trailerVideo"
        videoId={currentFilm.videoId}
      />
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

      <div className="filmPage__actorsBlock">
        <h2 className="actorsBlock__title">Actors</h2>
        <div className="actorsBlock">
          {currentFilm.actors.map(({ actorId, role }) => (
            <ActorCard key={actorId} actorId={actorId} role={role} />
          ))}
        </div>
      </div>
    </div>
  );
};
