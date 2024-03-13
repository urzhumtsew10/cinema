import { FC } from "react";
import { ReactComponent as Trash } from "../../../svg/trash.svg";
import axios from "axios";
import { useLazyGetFilmsQuery } from "../../../store/api";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSessionFilm } from "../../../store/office";
import { BASE_URL } from "../../App/App";

interface IFilm {
  id: string;
  title: string;
  imgPath: string;
}

export const SessionFilm: FC<IFilm> = ({ id, imgPath, title }) => {
  const [remove] = useLazyGetFilmsQuery();
  const dispatch = useAppDispatch();
  const movieId = useAppSelector((state) => state.office.sessionFilm);
  const removeFilm = async () => {
    const res = await axios.delete(`${BASE_URL}/movie/${id}`);
    remove("");
  };

  const changeFilm = () => {
    dispatch(setSessionFilm(id));
  };

  return (
    <div className="filmsBlock__film">
      <img className="film__img" src={imgPath} alt="poster" />
      <p className="film__title">{title}</p>
      <input
        onChange={changeFilm}
        checked={id === movieId}
        name="film"
        className="film__radio"
        type="radio"
      />
      <Trash onClick={removeFilm} className="film__trash" />
    </div>
  );
};
