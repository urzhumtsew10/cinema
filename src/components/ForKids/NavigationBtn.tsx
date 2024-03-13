import { FC } from "react";
import { ReactComponent as Arrow } from "../../svg/arrow.svg";
import { useSwiper } from "swiper/react";

export const NavigationBtn: FC = () => {
  const swiper = useSwiper();

  return (
    <>
      <button
        onClick={() => {
          swiper.slidePrev();
        }}
        className="swiperFilms__navBtn prevSlide"
      >
        <Arrow className="navBtn__img" />
      </button>
      <button
        onClick={() => {
          swiper.slideNext();
        }}
        className="swiperFilms__navBtn nextSlide"
      >
        <Arrow className="navBtn__img" />
      </button>
    </>
  );
};
