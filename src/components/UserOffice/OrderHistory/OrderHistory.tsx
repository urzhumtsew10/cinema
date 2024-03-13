import { FC, useEffect, useState } from "react";
import "../OrderHistory/OrderHistory.scss";
import { TOrder, useGetOrdersQuery } from "../../../store/api";
import { Ticket } from "./Ticket";

export const OrderHistory: FC = () => {
  const orders = useGetOrdersQuery("").data;
  const [userOrders, setUserOrders] = useState<TOrder[]>([
    {
      _id: "",
      userId: "",
      sessionId: "",
      movieId: "",
      numberSeats: [""],
      price: 0,
    },
  ]);

  useEffect(() => {
    const user = JSON.parse(String(localStorage.getItem("userData")));
    if (!orders || !user) return;
    const userOrders = orders.filter((order) => order.userId === user.id);
    setUserOrders(userOrders);
  }, [orders]);

  return (
    <div className="infoPage__orderHistoryPage">
      {userOrders &&
        userOrders.map(({ _id, sessionId, movieId, price, numberSeats }) => (
          <Ticket
            key={_id}
            ticketId={_id}
            sessionId={sessionId}
            numberSeats={numberSeats}
            price={price}
          />
        ))}
    </div>
  );
};
