import { FC, useEffect, useState } from "react";
import { ReactComponent as Star } from "../../svg/star.svg";
import { useGetFeedbacksQuery } from "../../store/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setMovieId } from "../../store/modal";

interface IFeedbackFilm {
  text: string;
  id: string;
}

export const FeedbackFilm: FC<IFeedbackFilm> = ({ text, id }) => {
  const { data } = useGetFeedbacksQuery("");
  const dispatch = useAppDispatch();
  const movieId = useAppSelector((state) => state.modal.movieId);
  const [movieRating, setMovieRating] = useState(0);

  useEffect(() => {
    const movieFeedbacks = data?.filter((feedback) => feedback.movieId === id);
    if (Array.isArray(movieFeedbacks) && movieFeedbacks.length) {
      const ratingsSum = movieFeedbacks.reduce((acc, feedback) => {
        return (acc += feedback.rating);
      }, 0);
      setMovieRating(+(ratingsSum / movieFeedbacks.length).toFixed(1));
    }
  }, [data]);

  const changeMovieId = () => {
    dispatch(setMovieId(id));
  };

  return (
    <div className="filmChoiceBlock__feedbackFilm">
      <input
        onChange={changeMovieId}
        checked={movieId === id}
        name="film"
        className="feedbackFilm__input"
        value={id}
        type="radio"
      />
      <span className="feedbackFilm__customInput"></span>
      <label className="feedbackFilm__title">{text}</label>
      <div className="feedbackFilm__ratingBlock">
        <Star className="ratingBlock__img" />
        <p className="ratingBlock__avarageRating">{movieRating}</p>
      </div>
    </div>
  );
};
