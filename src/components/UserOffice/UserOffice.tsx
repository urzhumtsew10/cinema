import { FC, useEffect, useState } from "react";
import "../UserOffice/UserOffice.scss";
import { ReactComponent as Avatar } from "../../svg/avatar.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NavItem } from "./NavItem";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PersonalData } from "./PersonalData/PersonalData";
import { FilmEditor } from "./FilmEditor/FilmEditor";
import { ActorEditor } from "./ActorEditor/ActorEditor";
import { SessionEditor } from "./SessionEditor/SessionEditor";
import { generateOfficeList } from "../../store/office";
import { setIsActive } from "../../store/navList";
import { OrderHistory } from "./OrderHistory/OrderHistory";

export const UserOffice: FC = () => {
  const navList = useAppSelector((state) => state.office.officeNavList);
  const activeNav = navList.find((item) => item.isActive === true);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(setIsActive(-1));
    try {
      const user = JSON.parse(String(localStorage.getItem("userData")));
      dispatch(generateOfficeList(user.role));
    } catch {
      navigation("/");
    }
  }, []);

  return (
    <div className="app__userOffice">
      <div className="userOffice__userInfoBlock">
        <nav className="userInfoBlock__infoNavigation">
          {navList.map(({ id, text, isActive }) => (
            <NavItem key={id} id={id} text={text} isActive={isActive} />
          ))}
        </nav>
        <div className="userInfoBlock__infoPage">
          {activeNav?.text === "Personal Data" && <PersonalData />}
          {activeNav?.text === "Order History" && <OrderHistory />}
          {activeNav?.text === "Film" && <FilmEditor />}
          {activeNav?.text === "Actor" && <ActorEditor />}
          {activeNav?.text === "Session" && <SessionEditor />}
        </div>
      </div>
    </div>
  );
};
