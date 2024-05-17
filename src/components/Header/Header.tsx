import { FC, useEffect, useRef, useState } from "react";
import "../Header/Header.scss";
import { ReactComponent as Magnifier } from "../../svg/magnifier.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Avatar } from "../../svg/avatar.svg";
import { ReactComponent as Close } from "../../images/close.svg";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "../../store/hooks";
import { setIsAuthUser } from "../../store/modal";
import { Movie, useGetFilmsQuery } from "../../store/api";
import { SearchMovie } from "./SearchMovie";

export const Header: FC = () => {
  interface IUserData {
    name: string;
    email: string;
    id: string;
  }

  const navigation = useNavigate();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const films: Movie[] | undefined = useGetFilmsQuery("").data;
  const [filteredFilms, setFilteredFilms] = useState<Movie[]>([]);
  const [searchingClass, setSearchingClass] = useState<string>("");
  const [userData, setUserData] = useState<IUserData>({
    name: "",
    email: "",
    id: "",
  });

  useEffect(() => {
    if (!cookies.token) {
      localStorage.removeItem("userData");
      dispatch(setIsAuthUser(false));
    } else {
      setUserData(JSON.parse(String(localStorage.getItem("userData"))));
    }
  }, [cookies.token]);

  const openUserOffice = () => {
    navigation("/office");
  };

  const moveToAuthPage = () => {
    navigation("/auth/login");
  };

  const trySearchMovie = () => {
    setSearchingClass("active");
    if (searchInputRef.current && films) {
      const searchText = searchInputRef.current.value.trim();
      const searchReg = new RegExp(
        `${searchInputRef.current.value.toLowerCase()}`
      );
      const filteredFilms = films.filter((film) => {
        const filmInfo =
          `${film.title} ${film.genre} ${film.country} ${film.releaseDate}`.toLowerCase();
        return searchReg.test(filmInfo);
      });
      setFilteredFilms(filteredFilms);
    }
  };

  const closeSearchingResults = () => {
    if (searchInputRef.current) searchInputRef.current.value = "";
    setSearchingClass("unactive");
  };

  const openFilmPage = (id: string) => {
    navigate(`/film/${id}`);
    closeSearchingResults();
  };

  return (
    <header id="home" className="header">
      <h3 className="header__greetings">
        {(cookies.token && "Hello") || "Your"}{" "}
        <span className="greetings__span">
          {(cookies.token && userData.name) || "Welcome"}!
        </span>
        😊
      </h3>
      <div className="header__searching">
        <div className="header__searchBar">
          <Magnifier onClick={trySearchMovie} className="searchBar__img" />
          <input
            ref={searchInputRef}
            className="searchBar__input"
            type="text"
            placeholder="Tap to search"
          />
          {searchingClass === "active" && (
            <Close
              onClick={closeSearchingResults}
              className="searchBar__closeImg"
            />
          )}
        </div>
        <div className={`searching__searchingResult ${searchingClass}`}>
          {filteredFilms &&
            filteredFilms.map(({ _id, title, genre, releaseDate, imgPath }) => (
              <SearchMovie
                key={_id}
                id={_id}
                title={title}
                genre={genre}
                releaseDate={releaseDate}
                imgPath={imgPath}
                openFilmPage={openFilmPage}
              />
            ))}
          {filteredFilms.length === 0 && (
            <p className="searching__text">Not found the films</p>
          )}
        </div>
      </div>

      {!cookies.token && (
        <button onClick={moveToAuthPage} className="header__loginBtn">
          Log in
        </button>
      )}

      {cookies.token && (
        <Avatar onClick={openUserOffice} className="signupBtn__img" />
      )}
    </header>
  );
};
