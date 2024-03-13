import { FC, useState } from "react";
import "../RegisterForm/RegisterForm.scss";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, ref, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "../../../store/hooks";
import { setIsAuthUser } from "../../../store/modal";
import { BASE_URL } from "../../App/App";

export const RegisterForm: FC = () => {
  interface INewUser {
    name: string;
    email: string;
    password: string;
    confirm: string;
  }

  const schemaNewUser = object({
    name: string().required("Name is required").min(4),
    email: string().email().required("Email is required"),
    password: string().required("Password is required").min(8),
    confirm: string()
      .required("Confirm is required")
      .oneOf([ref("password")], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewUser>({ resolver: yupResolver(schemaNewUser) });
  const navigation = useNavigate();

  const moveToLoginPage = () => {
    navigation("/auth/login");
  };

  const [isFreeEmail, setIsFreeEmail] = useState(true);
  const [cookies, setCookie] = useCookies(["token"]);
  const dispatch = useAppDispatch();

  const tryCreateNewUser: SubmitHandler<INewUser> = async (data) => {
    const res = await axios.post(`${BASE_URL}/user/register`, data);
    setIsFreeEmail(res.data);
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
    <div className="authorizationModal__registerFormBlock">
      <h3 className="registerFormBlock__title">Sign up to Cinema</h3>
      <form
        onSubmit={handleSubmit(tryCreateNewUser)}
        className="registerFormBlock__registerForm"
      >
        <div className="registerForm__inputBox">
          <p className="inputBox__error">{errors.name?.message}</p>
          <input
            {...register("name", { required: "Name is required" })}
            className={`inputBox__input ${errors.name?.message && "error"}`}
            type="text"
            placeholder="Enter your name"
          />
        </div>
        <div className="registerForm__inputBox">
          <p className="inputBox__error">
            {errors.email?.message ||
              (!isFreeEmail && "Email has already used")}
          </p>
          <input
            {...register("email")}
            className={`inputBox__input ${errors.email?.message && "error"}`}
            type="text"
            placeholder="Enter email"
          />
        </div>
        <div className="registerForm__inputBox">
          <p className="inputBox__error">{errors.password?.message}</p>
          <input
            {...register("password")}
            className={`inputBox__input ${errors.password?.message && "error"}`}
            type="password"
            autoComplete="cinema-password"
            placeholder="Enter password"
          />
        </div>
        <div className="registerForm__inputBox">
          <p className="inputBox__error">{errors.confirm?.message}</p>
          <input
            {...register("confirm")}
            className={`inputBox__input ${errors.confirm?.message && "error"}`}
            type="password"
            autoComplete="cinema-password"
            placeholder="Confirm password"
          />
        </div>
        <button className="registerForm__btnSubmit">Sign up</button>
      </form>
      <p className="registerFormBlock__text">
        Already have account?{" "}
        <span onClick={moveToLoginPage} className="text__span">
          Log in
        </span>
      </p>
    </div>
  );
};
