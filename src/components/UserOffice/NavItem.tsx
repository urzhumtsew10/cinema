import { FC } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setActiveNavItem } from "../../store/office";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface INavItem {
  id: number;
  text: string;
  isActive: boolean;
}

export const NavItem: FC<INavItem> = ({ id, text, isActive }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const clickItem = () => {
    dispatch(setActiveNavItem(id));
    if (text === "Log out") {
      navigation("/");
      localStorage.removeItem("userData");
      console.log("work before");
      removeCookie("token");
      console.log("work after");
      dispatch(setActiveNavItem(1));
    }
  };
  return (
    <p
      onClick={clickItem}
      className={`infoNavigation__item ${isActive && "active"}`}
    >
      {text}
    </p>
  );
};
