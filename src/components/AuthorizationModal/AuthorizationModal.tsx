import { useParams } from "react-router-dom";
import "../AuthorizationModal/AuthorizationModal.scss";
import { AuthForm } from "./AuthForm/AuthForm";
import { RegisterForm } from "./RegisterForm/RegisterForm";

export const AuthorizationModal = () => {
  const modal = useParams().modal;
  return (
    <div className="app__authorizationModal">
      <div className="authorizationModal__authContent">
        {modal === "login" && <AuthForm />}
        {modal === "signup" && <RegisterForm />}
      </div>
    </div>
  );
};
