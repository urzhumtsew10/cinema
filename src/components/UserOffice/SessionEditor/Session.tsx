import { FC, useEffect } from "react";
import { ReactComponent as Trash } from "../../../svg/trash.svg";
import {
  useGetFilmQuery,
  useLazyGetOrdersQuery,
  useLazyGetSessionsQuery,
} from "../../../store/api";
import axios from "axios";
import { BASE_URL } from "../../App/App";

interface ISession {
  id: string;
  movieId: string;
  date: string;
  time: string;
}

export const Session: FC<ISession> = ({ id, movieId, date, time }) => {
  const { data } = useGetFilmQuery(movieId);
  const [refreshSessions] = useLazyGetSessionsQuery();
  const [refreshOrders] = useLazyGetOrdersQuery();

  const removeSession = async () => {
    const res = await axios.delete(`${BASE_URL}/session/${id}`);
    refreshSessions("");
    refreshOrders("");
  };

  return (
    <div className="sessionsBlock__session">
      <img className="session__img" src={data?.imgPath} alt="poster" />
      <p className="session__title">{`${data?.title} ${date} (${time})`}</p>
      <Trash onClick={removeSession} className="session__trash" />
    </div>
  );
};
