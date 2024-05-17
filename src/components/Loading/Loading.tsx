import { FC } from "react";
import "./Loading.scss";

export const Loading: FC = () => {
  return (
    <div className="loading">
      <p className="loading__title">Please, wait some time!</p>
      <span className="loader"></span>
    </div>
  );
};
