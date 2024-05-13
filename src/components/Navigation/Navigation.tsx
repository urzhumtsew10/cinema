import { FC } from "react";
import "../Navigation/Navigation.scss";
import logo from "../../images/logo.png";
import { NavigationItem } from "./NavigationItem";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

export const Navigation: FC = () => {
  const navList = useAppSelector((state) => state.nav.list);
  const navigate = useNavigate();

  const openHomePage = () => {
    navigate("/");
  };

  return (
    <nav className="navigation">
      <img
        onClick={openHomePage}
        className="navigation__img"
        src={logo}
        alt="logo"
      />
      <p className="navigation__text">Menu</p>
      <ul className="navigation__navigationList">
        {navList.slice(0, 3).map(({ id, text, name, isActive }) => (
          <NavigationItem
            key={id}
            id={id}
            text={text}
            name={name}
            isActive={isActive}
          />
        ))}
      </ul>
      <p className="navigation__text">Genaral</p>
      <ul className="navigation__navigationList">
        {navList.slice(3, 5).map(({ id, text, name, isActive }) => (
          <NavigationItem
            key={id}
            id={id}
            text={text}
            name={name}
            isActive={isActive}
          />
        ))}
      </ul>
    </nav>
  );
};
