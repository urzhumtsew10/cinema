import { FC, useState } from "react";
import "../AuthForm/AuthForm.scss";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "../../../store/hooks";
import { setIsAuthUser } from "../../../store/modal";
import { BASE_URL } from "../../App/App";

export const AuthForm: FC = () => {
  interface ILoginUser {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginUser>();
  const navigation = useNavigate();

  const moveToSignupPage = () => {
    navigation("/auth/signup");
  };

  const [isOldUser, setIsOldUser] = useState(true);
  const [cookies, setCookie] = useCookies(["token"]);
  const dispatch = useAppDispatch();

  const tryLogin: SubmitHandler<ILoginUser> = async (data) => {
    const res = await axios.post(`${BASE_URL}/user/auth`, data);
    setIsOldUser(res.data);

    if (res.data) {
      const data = res.data;
      setCookie("token", data.token, { maxAge: 4 * 60 * 60 });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        })
      );
      dispatch(setIsAuthUser(true));
      navigation("/");
    }
  };

  return (
    <div className="authContent__authFormBlock">
      <h3 className="authFormBlock__title">Log in to Cinema</h3>
      <form
        onSubmit={handleSubmit(tryLogin)}
        className="authFormBlock__authForm"
      >
        <div className="authForm__inputBox">
          <p className="inputBox__error">
            {!isOldUser && "Email isn't correct"}
          </p>
          <input
            {...register("email")}
            className={`inputBox__input ${!isOldUser && "error"}`}
            type="email"
            placeholder="Enter email"
          />
        </div>
        <div className="authForm__inputBox">
          <p className="inputBox__error">
            {!isOldUser && "Password isn't correct"}
          </p>
          <input
            {...register("password")}
            className={`inputBox__input ${!isOldUser && "error"}`}
            type="password"
            autoComplete="cinema-password"
            placeholder="Enter password"
          />
        </div>
        <button className="authForm__btnSubmit">Log in</button>
      </form>
      <p className="authFormBlock__text">
        Create new account?{" "}
        <span onClick={moveToSignupPage} className="text__span">
          Create
        </span>
      </p>
    </div>
  );
};
