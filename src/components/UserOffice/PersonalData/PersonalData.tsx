import { FC, useEffect, useRef, useState } from "react";
import "../PersonalData/PersonalData.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Pencil } from "../../../svg/pencil.svg";
import { ReactComponent as Save } from "../../../svg/file.svg";
import axios from "axios";
import { BASE_URL } from "../../App/App";

export const PersonalData: FC = () => {
  const navigation = useNavigate();
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [isChanged, setIsChanged] = useState(false);
  const [passwordValue, setPasswordValue] = useState<string | undefined>("");
  interface IUser {
    name: string;
    email: string;
    role: string;
    id: string;
  }
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    role: "",
    id: "",
  });
  useEffect(() => {
    const user = JSON.parse(String(localStorage.getItem("userData")));
    if (!user) return navigation("/");
    setUser(user);
  }, []);

  const changeUserPassword = () => {
    const inputValue = passwordInputRef.current?.value;
    setPasswordValue(inputValue);
    if (inputValue && inputValue.length >= 8) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  const handlingPassword = async () => {
    if (isChanged) {
      const user = JSON.parse(String(localStorage.getItem("userData")));
      const res = await axios.patch(`${BASE_URL}/user/${user.id}`, {
        password: passwordInputRef.current?.value,
      });
      setIsChanged(false);
      setPasswordValue("");
      return;
    }
    passwordInputRef.current?.focus();
  };

  return (
    <div className="infoPage__personalDataPage">
      <div className="personalDataPage__personalInfoBlock">
        <h3 className="personalInfoBlock__title">Name</h3>
        <p className="personalInfoBlock__text">{user.name}</p>
      </div>
      <div className="personalDataPage__personalInfoBlock">
        <h3 className="personalInfoBlock__title">Email</h3>
        <p className="personalInfoBlock__text">{user.email}</p>
      </div>
      <div className="personalDataPage__personalInfoBlock">
        <h3 className="personalInfoBlock__title">Password</h3>
        <div className="parsonalInfoBlock__changePasswordBlock">
          <input
            onChange={changeUserPassword}
            value={passwordValue}
            ref={passwordInputRef}
            className="changePasswordBlock__input"
            type="text"
            placeholder="*********"
          />
          <button
            onClick={handlingPassword}
            className="changePasswordBlock__actionBtn"
          >
            {!isChanged && <Pencil className="actionBtn__img pencilIcon" />}
            {isChanged && <Save className="actionBtn__img fileIcon" />}
          </button>
        </div>
      </div>
    </div>
  );
};
