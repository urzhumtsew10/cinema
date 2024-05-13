import { FC, useEffect, useState } from "react";
import "../ForKids/ForKids.scss";
import { Movie, useGetFilmsQuery } from "../../store/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { KidsFilm } from "./KidsFilm";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { NavigationBtn } from "./NavigationBtn";

export const ForKids: FC = () => {
  const [kidsFilms, setKidsFilms] = useState<Movie[]>([]);
  const films = useGetFilmsQuery("").data;

  const [countFilms, setCountFilms] = useState<number>(1.35);

  useEffect(() => {
    if (window.screen.width >= 1280) {
      setCountFilms(3.35);
    } else if (window.screen.width < 1280 && window.screen.width >= 768) {
      setCountFilms(2.35);
    }
    if (window.screen.width > 360 && window.screen.width <= 767) {
      setCountFilms(1.35);
    }
  }, [window.screen.width]);

  useEffect(() => {
    if (!films) return;
    const kidsFilms = films.filter((film) => film.restriction <= 6);
    setKidsFilms(kidsFilms);
  }, [films]);

  return (
    <div className="app__forKidsBlock">
      <h2 className="forKidsBlock__title">For Kids</h2>
      <Swiper
        className="forKidsBlock__swiperFilms"
        slidesPerView={countFilms}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {kidsFilms &&
          kidsFilms.map(
            ({
              _id,
              title,
              imgPath,
              genre,
              country,
              restriction,
              releaseDate,
            }) => (
              <SwiperSlide key={_id}>
                <KidsFilm
                  key={_id}
                  id={_id}
                  title={title}
                  imgPath={imgPath}
                  genre={genre}
                  country={country}
                  releaseDate={releaseDate}
                  restriction={restriction}
                />
              </SwiperSlide>
            )
          )}
        <NavigationBtn />
      </Swiper>
    </div>
  );
};
