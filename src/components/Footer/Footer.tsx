import { FC } from "react";
import "../Footer/Footer.scss";
import logo from "../../images/logo.png";
import icon_instagram from "../../images/icon-instagram.svg";
import icon_facebook from "../../images/icon-facebook.svg";
import icon_youtube from "../../images/icon-youtube.svg";
import icon_call from "../../images/icon-call.svg";
import icon_location from "../../images/icon-location.svg";
import icon_email from "../../images/icon-email.svg";

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer__columnOne">
        <img className="columnOne__img" src={logo} alt="logo" />
        <p className="columnOne__text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
          excepturi illo quibusdam. Similique, unde! Quasi, consequatur velit
          cupiditate obcaecati omnis reiciendis sit. Doloremque nobis quibusdam,
          deleniti fuga facilis magnam eligendi.
        </p>
      </div>
      <div className="footer__columnTwo">
        <p className="columnTwo__title">Links</p>
        <ul className="columnTwo__linksList">
          <li className="linksList__item">About us</li>
          <li className="linksList__item">Carrer</li>
          <li className="linksList__item">Concession</li>
          <li className="linksList__item">Privacy Policy</li>
          <li className="linksList__item">Terms & Condition</li>
        </ul>
      </div>
      <div className="footer__columnThree">
        <p className="columnThree__title">Concats us</p>
        <ul className="columnThree__contacsList">
          <li className="contacsList__item">
            <div className="item__circle">
              <img className="circleInfo__img" src={icon_call} alt="call" />
            </div>{" "}
            (012) 93 290 99 00
          </li>
          <li className="contacsList__item">
            <div className="item__circle">
              <img className="circleInfo__img" src={icon_email} alt="email" />
            </div>
            test@gmail.com
          </li>
          <li className="contacsList__item">
            <div className="item__circle">
              <img
                className="circleInfo__img"
                src={icon_location}
                alt="location"
              />
            </div>
            Stardust Lane 56, Lumina city, Skyland
          </li>
        </ul>
      </div>
      <div className="footer__columnFour">
        <p className="columnFour__title">Follows us</p>
        <div className="columnFour__networksBlock">
          <div className="networksBlock__circle">
            <img className="circle__img" src={icon_instagram} alt="network" />
          </div>
          <div className="networksBlock__circle">
            <img className="circle__img" src={icon_facebook} alt="network" />
          </div>
          <div className="networksBlock__circle">
            <img className="circle__img" src={icon_youtube} alt="network" />
          </div>
        </div>
      </div>
    </footer>
  );
};
