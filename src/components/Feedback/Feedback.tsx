import { FC, useState } from "react";
import "../Feedback/Feedback.scss";
import { ReactComponent as Star } from "../../svg/star.svg";
import { useGetFilmsQuery, useLazyGetFeedbacksQuery } from "../../store/api";
import { FeedbackFilm } from "./FeedbackFIlm";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setMovieId } from "../../store/modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../App/App";

export interface IFeedback {
  userId: string;
  comment: string;
}

export const Feedback: FC = () => {
  const { data } = useGetFilmsQuery("");
  const [refreshFeedbacks] = useLazyGetFeedbacksQuery();
  const [hoverStar, setHoverStar] = useState<number>(-1);
  const [rating, setRating] = useState<number>(-1);
  const [extraClass, setExtraClass] = useState<string>("");
  const movieId = useAppSelector((state) => state.modal.movieId);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IFeedback>();

  const tryCreateFeedback = async (data: any) => {
    setExtraClass("error");
    const user = JSON.parse(String(localStorage.getItem("userData")));
    if (user === null) {
      navigation("/auth/login");
      return;
    }
    if (!movieId && rating === -1) return false;
    const res = await axios.post(`${BASE_URL}/feedback`, {
      ...data,
      userId: user.id,
      rating: rating + 1,
      movieId: movieId,
    });
    refreshFeedbacks("");
    dispatch(setMovieId(""));
    setExtraClass("");
    setRating(-1);
    reset();
  };

  return (
    <div id="calendar" className="app__feedbackBlock">
      <p className="feedbackBlock__title">
        <span className="feedbackBlock__title__span">Already watched?</span>{" "}
        <br /> Your feedback helps others decide which films to watch
      </p>
      <form
        onSubmit={handleSubmit(tryCreateFeedback)}
        className="feedbackBlock__feedbackForm"
      >
        <div className="feeedbackForm__feedbackFilmsBlock">
          <p className="feedbackFilmsBlock__text">Select movie to rate</p>
          <div
            className={`feedbackFilmsBlock__filmChoiceBlock ${
              !movieId && extraClass
            }`}
          >
            {data &&
              data.map(({ title, _id }) => (
                <FeedbackFilm key={_id} id={_id} text={title} />
              ))}
          </div>
        </div>
        <div className="feedbackForm__feedbackInfoBlock">
          <p className="feedbackInfoBlock__title">
            How do you rate this movie?
          </p>
          <div
            className={`feedbackInfoBlock__starsBlock ${
              rating === -1 && extraClass
            }`}
          >
            {Array(5)
              .fill(0)
              .map((star, index) => (
                <Star
                  key={index}
                  onMouseMove={() => setHoverStar(index)}
                  onMouseOut={() => setHoverStar(-1)}
                  onClick={() => setRating(index)}
                  className={`starsBlock__img ${
                    index <= hoverStar && "active"
                  } ${index <= rating && "active"}`}
                />
              ))}
          </div>
          <textarea
            {...register("comment")}
            className="feedbackInfoBlock__comment"
            placeholder="Your message"
          ></textarea>
          <button className="feedbackInfoBlock__btn">Send</button>
        </div>
      </form>
    </div>
  );
};
