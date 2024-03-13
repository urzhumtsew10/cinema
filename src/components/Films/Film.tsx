import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IFilm {
  imgPath: string;
  title: string;
  restriction: number;
  releaseDate: string;
  genre: string;
  country: string;
  id: string;
}

export const Film: FC<IFilm> = ({
  imgPath,
  title,
  genre,
  country,
  releaseDate,
  restriction,
  id,
}) => {
  const navigation = useNavigate();
  const openFilmPage = () => {
    navigation(`/film/${id}`);
  };

  return (
    <div onClick={openFilmPage} className="filmsPreview__filmPoster">
      <span className="filmPoster__span">{restriction}+</span>
      <img className="filmPoster__img" src={imgPath} alt="poster" />
      <p className="filmPoster__info">
        {releaseDate.slice(0, 4)} / {genre} / {country}
      </p>
      <p className="filmPoster__title">{title}</p>
    </div>
  );
};
