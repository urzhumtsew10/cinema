import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ISlideFilm {
  title: string;
  description: string;
  restriction: string;
  imgName: string;
  genre: string;
  country: string;
  movieId: string;
}

export const SlideFilm: FC<ISlideFilm> = ({
  title,
  restriction,
  description,
  country,
  genre,
  imgName,
  movieId,
}) => {
  const navigation = useNavigate();
  const openFilmPage = () => {
    navigation(`/film/${movieId}`);
  };

  return (
    <div className="sliderFilm__slideBlock">
      <img
        className="slideBlock__img"
        src={require(`../../images/${imgName}`)}
        alt={title}
      />
      <div className="slideBlock__filmInfo">
        <ul className="filmInfo__infoList">
          <li className="infoList__item">{genre}</li>
          <li className="infoList__item">{country}</li>
          <li className="infoList__item">{restriction}+</li>
        </ul>
        <p className="filmInfo__title">{title}</p>
        <p className="filmInfo__description">{description}</p>
      </div>
      <button onClick={openFilmPage} className="sliderBlock__btnBooking">
        Watch
      </button>
    </div>
  );
};
