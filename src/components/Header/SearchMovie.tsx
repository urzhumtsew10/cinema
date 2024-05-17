import { FC } from "react";

type TSearchMovie = {
  id: string;
  title: string;
  genre: string;
  releaseDate: string;
  imgPath: string;
  openFilmPage: any;
};

export const SearchMovie: FC<TSearchMovie> = ({
  id,
  title,
  genre,
  releaseDate,
  imgPath,
  openFilmPage,
}) => {
  return (
    <div
      onClick={() => openFilmPage(id)}
      className="searchingResult__searchMovie"
    >
      <img className="searchMovie__poster" src={imgPath} alt="poster" />
      <div className="searchMovie__info">
        <h3 className="searchMovie__title">{title}</h3>
        <p className="searchMovie__genre">{genre}</p>
        <p className="searchMovie__releaseYear">{releaseDate.slice(0, 4)}</p>
      </div>
    </div>
  );
};
