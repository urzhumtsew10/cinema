import { FC } from "react";
import "../SessionEditor/SessionEditor.scss";
import {
  useGetFilmQuery,
  useGetFilmsQuery,
  useGetSessionsQuery,
  useLazyGetSessionsQuery,
} from "../../../store/api";
import { SessionFilm } from "./SessionFilm";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import axios from "axios";
import { setSessionFilm } from "../../../store/office";
import { Session } from "./Session";
import { BASE_URL } from "../../App/App";

export interface ISession {
  date: string;
  time: string;
}

export const SessionEditor: FC = () => {
  const { data } = useGetFilmsQuery("");
  const sessions = useGetSessionsQuery("").data;
  const [refreshSessions] = useLazyGetSessionsQuery();
  const movieId = useAppSelector((state) => state.office.sessionFilm);
  const currentMovie = useGetFilmQuery(movieId).data;
  const disptach = useAppDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const tryCreateSession = async (data: any) => {
    if (!movieId) return false;
    const res = await axios.post(`${BASE_URL}/session`, {
      ...data,
      movieId: movieId,
    });
    reset();
    disptach(setSessionFilm(""));
    refreshSessions("");
  };

  return (
    <div className="infoPage__sessionEditor">
      <form
        onSubmit={handleSubmit(tryCreateSession)}
        className="sessionEditor__sessionForm"
      >
        <div className={`sessionForm__filmsBlock ${!movieId && "error"}`}>
          {data &&
            data.map(({ imgPath, _id, title }) => (
              <SessionFilm key={_id} id={_id} imgPath={imgPath} title={title} />
            ))}
        </div>
        <input
          {...register("date", { required: true })}
          className={`sessionForm__input ${errors.date && "error"}`}
          type="date"
          min={movieId && currentMovie?.releaseDate}
        />
        <input
          {...register("time", { required: true })}
          className={`sessionForm__input ${errors.time && "error"}`}
          type="time"
          min="09:00"
          max="20:00"
        />
        <button className="sessionForm__btn">Create new session</button>
      </form>
      <div className="sessionEditor__sessionsBlock">
        {sessions &&
          sessions.map(({ _id, movieId, date, time }) => (
            <Session
              key={_id}
              id={_id}
              movieId={movieId}
              date={date}
              time={time}
            />
          ))}
      </div>
    </div>
  );
};
