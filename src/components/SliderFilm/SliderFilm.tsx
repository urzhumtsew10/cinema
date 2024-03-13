import { FC } from "react";
import "../SliderFilm/SliderFilm.scss";
import { useAppSelector } from "../../store/hooks";
import { SlideFilm } from "./SlideFilm";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";

export const SliderFilm: FC = () => {
  const filmSliderList = useAppSelector((state) => state.slider.filmList);
  return (
    <Swiper
      modules={[EffectCoverflow]}
      className="homePage__sliderFilm"
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={2}
      coverflowEffect={{ rotate: 25, stretch: 50, depth: 100, modifier: 2.5 }}
      loop={true}
    >
      {filmSliderList.map(
        ({
          title,
          description,
          country,
          genre,
          restriction,
          imgName,
          id,
          movieId,
        }) => (
          <SwiperSlide key={id}>
            <SlideFilm
              movieId={movieId}
              key={id}
              title={title}
              country={country}
              description={description}
              genre={genre}
              restriction={restriction}
              imgName={imgName}
            />
          </SwiperSlide>
        )
      )}
    </Swiper>
  );
};
