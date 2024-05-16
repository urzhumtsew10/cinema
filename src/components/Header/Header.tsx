import { FC, useEffect, useState } from "react";
import "../Header/Header.scss";
import { ReactComponent as Magnifier } from "../../svg/magnifier.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Avatar } from "../../svg/avatar.svg";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "../../store/hooks";
import { setIsAuthUser } from "../../store/modal";

export const Header: FC = () => {
  interface IUserData {
    name: string;
    email: string;
    id: string;
  }

  const navigation = useNavigate();
  const [cookies] = useCookies(["token"]);
  const dispatch = useAppDispatch();
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

  return (
    <header id="home" className="header">
      <h3 className="header__greetings">
        {(cookies.token && "Hello") || "Your"}{" "}
        <span className="greetings__span">
          {(cookies.token && userData.name) || "Welcome"}!
        </span>
        😊
      </h3>
      <div className="header__searchBar">
        <Magnifier className="searchBar__img" />
        <input
          className="searchBar__input"
          type="text"
          placeholder="Tap to search"
        />
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
