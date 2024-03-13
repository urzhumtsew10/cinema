import { BaseSyntheticEvent, FC, useEffect, useState } from "react";
import "../Films/Films.scss";
import { Film } from "./Film";
import { Movie, useGetFilmsQuery, useGetSessionsQuery } from "../../store/api";
import { FilterSelect } from "./FilterSelect";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFilter } from "../../store/modal";

export const Films: FC = () => {
  const films = useGetFilmsQuery("").data;
  const sessions = useGetSessionsQuery("").data;
  const [countries, setCountries] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [filterDay, setFilterDay] = useState<string>("All Films");
  const [filteredFilms, setFilteredFilms] = useState<Movie[]>([]);
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.modal.filter);

  const getDate = (day: string): string => {
    let date = new Date();
    let mounth =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    let mounthDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    switch (day) {
      case "Today":
        return `${date.getFullYear()}-${mounth}-${mounthDay}`;
      case "Tomorrow":
        date.setDate(date.getDate() + 1);
        mounth =
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1;
        mounthDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return `${date.getFullYear()}-${mounth}-${mounthDay}`;
      default:
        return ``;
    }
  };

  useEffect(() => {
    if (!sessions || !films) return;
    dispatch(setFilter({ type: "day", value: filterDay }));
  }, [films, filterDay]);

  useEffect(() => {
    if (!sessions || !films) return;
    if (filter.day === "All Films") {
      const filtered = films
        .filter((film) => {
          if (filter.country === "All") return true;
          return filter.country === film.country;
        })
        .filter((film) => {
          if (filter.genre === "All") return true;
          return filter.genre === film.genre;
        });

      setFilteredFilms(filtered);
      return;
    }
    const moviesId = sessions
      .map((session) => {
        if (filter.day === "All Films") return session.movieId;
        if (session.date === getDate(filter.day)) return session.movieId;
      })
      .filter((session) => session);

    const filtered = films
      .filter((film) => moviesId.includes(film._id))
      .filter((film) => {
        if (filter.country === "All") return true;
        return filter.country === film.country;
      })
      .filter((film) => {
        if (filter.genre === "All") return true;
        return filter.genre === film.genre;
      });

    setFilteredFilms(filtered);
  }, [filter, films]);

  useEffect(() => {
    if (!films) return;
    setFilteredFilms(films);
    setCountries(getUniqueItems(films, "country"));
    setGenres(getUniqueItems(films, "genre"));
  }, [films]);

  const getUniqueItems = (data: any, category: string): string[] => {
    if (Object.keys(data).includes(category)) return [];
    const uniqueItems: string[] = ["All"];
    data.forEach((film: any) => {
      if (!uniqueItems.includes(film[category])) {
        uniqueItems.push(film[category]);
      }
    });
    return uniqueItems;
  };

  const changeFilterDay = (event: BaseSyntheticEvent) => {
    setFilterDay(event.target.innerText);
  };

  return (
    <div className="homePage__films">
      <div className="films__filmFilter">
        <div className="filmFilter__filterByDay">
          <p
            onClick={changeFilterDay}
            className={`filterByDay__text ${
              filterDay === "All Films" && "active"
            }`}
          >
            All Films
          </p>
          <p
            onClick={changeFilterDay}
            className={`filterByDay__text ${filterDay === "Today" && "active"}`}
          >
            Today
          </p>
          <p
            onClick={changeFilterDay}
            className={`filterByDay__text ${
              filterDay === "Tomorrow" && "active"
            }`}
          >
            Tomorrow
          </p>
        </div>
        <div className="filmFilter__filterSelectBox">
          <FilterSelect type="country" list={countries} />
          <FilterSelect type="genre" list={genres} />
        </div>
      </div>
      <div className="films__filmsPreview">
        {filteredFilms &&
          filteredFilms.map(
            ({
              _id,
              title,
              imgPath,
              genre,
              country,
              restriction,
              releaseDate,
            }) => (
              <Film
                key={_id}
                id={_id}
                title={title}
                imgPath={imgPath}
                genre={genre}
                country={country}
                releaseDate={releaseDate}
                restriction={restriction}
              />
            )
          )}
      </div>
    </div>
  );
};
