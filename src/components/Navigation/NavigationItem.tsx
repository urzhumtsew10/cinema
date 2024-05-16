import { FC } from "react";
import { ReactComponent as HomeSvg } from "../../svg/home.svg";
import { ReactComponent as CalendarSvg } from "../../svg/calendar.svg";
import { ReactComponent as TicketSvg } from "../../svg/ticket.svg";
import { ReactComponent as LogoutSvg } from "../../svg/logout.svg";
import { ReactComponent as SettingsSvg } from "../../svg/settings.svg";
import { useAppDispatch } from "../../store/hooks";
import { setIsActive } from "../../store/navList";
import { useNavigate } from "react-router-dom";
import { resetSelectedSeats } from "../../store/modal";
import { setActiveNavItem } from "../../store/office";
import { useCookies } from "react-cookie";
import { Link } from "react-scroll";

interface INavigationItem {
  id: number;
  text: string;
  name: string;
  isActive: Boolean;
}

export const NavigationItem: FC<INavigationItem> = ({
  text,
  name,
  isActive,
  id,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const getComponentSvg = (name: string, isActive: Boolean) => {
    switch (name) {
      case "home":
        return (
          <HomeSvg
            onClick={selectItem}
            className={`navigationList__item__img homeSvg ${
              isActive && "active"
            }`}
          />
        );
        break;
      case "ticket":
        return (
          <TicketSvg
            onClick={selectItem}
            className={`navigationList__item__img ticketSvg ${
              isActive && "active"
            }`}
          />
        );
        break;
      case "calendar":
        return (
          <CalendarSvg
            onClick={selectItem}
            className={`navigationList__item__img calendarSvg ${
              isActive && "active"
            }`}
          />
        );
        break;
      case "settings":
        return (
          <SettingsSvg
            onClick={selectItem}
            className={`navigationList__item__img settingsSvg ${
              isActive && "active"
            }`}
          />
        );
        break;
      case "logout":
        return (
          <LogoutSvg
            onClick={selectItem}
            className={`navigationList__item__img logoutSvg ${
              isActive && "active"
            }`}
          />
        );
        break;
    }
  };
  function selectItem() {
    navigation("/");
    if (text === "Log out") {
      navigation("/");
      localStorage.removeItem("userData");
      removeCookie("token");
      dispatch(setActiveNavItem(1));
      dispatch(setIsActive(1));
      return;
    }
    dispatch(resetSelectedSeats());
    dispatch(setIsActive(id));
  }

  return (
    <li className={`navigationList__item`}>
      <Link
        className="navigationList__item__link"
        to={`${name}`}
        spy={true}
        smooth={true}
        offset={0}
        duration={1000}
      >
        {getComponentSvg(name, isActive)}
        <p
          onClick={selectItem}
          className={`navigationList__item__text ${isActive && "active"}`}
        >
          {text}
        </p>
      </Link>
    </li>
  );
};
