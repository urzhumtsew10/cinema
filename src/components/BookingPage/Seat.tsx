import { FC } from "react";
import { ReactComponent as SeatSVG } from "../../svg/seat.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleSelectedSeats } from "../../store/modal";

export type TSessionSeats = {
  userSeats: string[];
  busySeats: string[];
};

export const Seat: FC<{
  id: string;
  sessionSeats: TSessionSeats;
}> = ({ id, sessionSeats }) => {
  const dispatch = useAppDispatch();
  const selectedSeats = useAppSelector((state) => state.modal.selectedSeats);

  const toggleSeat = () => {
    if (
      !sessionSeats.busySeats.includes(id) &&
      !sessionSeats.userSeats.includes(id)
    )
      dispatch(toggleSelectedSeats(id));
  };

  return (
    <SeatSVG
      onClick={toggleSeat}
      className={`seatsBlock__img ${
        sessionSeats.busySeats.includes(id) && "busy"
      } ${sessionSeats.userSeats.includes(id) && "own"} ${
        selectedSeats.includes(id) && "selected"
      }`}
    />
  );
};
