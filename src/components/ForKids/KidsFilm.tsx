import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IFilm {
  id: string;
  title: string;
  imgPath: string;
  genre: string;
  country: string;
  restriction: number;
  releaseDate: string;
}

export const KidsFilm: FC<IFilm> = ({
  id,
  title,
  imgPath,
  genre,
  country,
  restriction,
  releaseDate,
}) => {
  const navigation = useNavigate();
  const openFilmPage = () => {
    navigation(`/film/${id}`);
  };

  return (
    <div onClick={openFilmPage} className="forKidsBlock__kidsFilm">
      <img className="kidsFilm__img" src={imgPath} alt="img" />
      <p className="kidsFilm__info">
        {releaseDate.slice(0, 4)} / {genre} / {country}
      </p>
      <p className="kidsFilm__title">{title}</p>
    </div>
  );
};
