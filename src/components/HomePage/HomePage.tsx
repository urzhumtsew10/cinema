import { FC, useEffect } from "react";
import "../HomePage/HomePage.scss";
import { SliderFilm } from "../SliderFilm/SliderFilm";
import { Films } from "../Films/Films";
import { Feedback } from "../Feedback/Feedback";
import { ForKids } from "../ForKids/ForKids";
import {
  useGetOrdersQuery,
  useGetSessionsQuery,
  useLazyGetOrdersQuery,
  useLazyGetSessionsQuery,
} from "../../store/api";
import axios from "axios";
import { BASE_URL } from "../App/App";

export const HomePage: FC = () => {
  const [refreshSessions] = useLazyGetSessionsQuery();
  const sessions = useGetSessionsQuery("").data;
  const orders = useGetOrdersQuery("").data;
  const [refreshOrders] = useLazyGetOrdersQuery();

  const updateSessions = () => {
    const todayDay = new Date().getDate();
    const todayMounth = new Date().getMonth() + 1;

    sessions?.forEach(async ({ date, _id }) => {
      const sessionDay = +date.slice(8, 10);
      const sessionMouth = +date.slice(5, 7);
      if (todayMounth > sessionMouth) {
        const res = await axios.delete(`${BASE_URL}/session/${_id}`);
      } else if (todayMounth === sessionMouth && todayDay > sessionDay) {
        const res = await axios.delete(`${BASE_URL}/session/${_id}`);
        refreshSessions("");
      }
    });
  };

  const updateOrders = () => {
    if (!sessions || !orders) return;

    const sessionsId = sessions.map((session) => session._id);
    orders.forEach(async ({ sessionId, _id }) => {
      if (!sessionsId.includes(sessionId)) {
        const res = await axios.delete(`${BASE_URL}/order/${_id}`);
        refreshOrders("");
      }
    });
  };

  useEffect(() => {
    updateSessions();
    updateOrders();
  }, []);

  return (
    <section className="app__homePage">
      <SliderFilm />
      <Films />
      <ForKids />
      <Feedback />
    </section>
  );
};
