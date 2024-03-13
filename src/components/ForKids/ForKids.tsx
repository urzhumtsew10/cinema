import { FC, useEffect, useRef, useState } from "react";
import "../ForKids/ForKids.scss";
import { Movie, useGetFilmsQuery } from "../../store/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactComponent as Arrow } from "../../svg/arrow.svg";
import { KidsFilm } from "./KidsFilm";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { NavigationBtn } from "./NavigationBtn";

export const ForKids: FC = () => {
  const [kidsFilms, setKidsFilms] = useState<Movie[]>([]);
  const films = useGetFilmsQuery("").data;

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
        spaceBetween={30}
        slidesPerView={3}
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
