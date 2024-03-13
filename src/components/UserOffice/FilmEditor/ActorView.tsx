import { ChangeEvent, FC, useState } from "react";
import { ReactComponent as Trash } from "../../../svg/trash.svg";
import axios from "axios";
import { useLazyGetActorsQuery } from "../../../store/api";
import { UseFormRegister } from "react-hook-form";
import { IFilm } from "./FilmEditor";
import { BASE_URL } from "../../App/App";

interface IActor {
  _id: number;
  name: string;
  surname: string;
  imgPath: string;
  register: UseFormRegister<IFilm>;
}

export const ActorView: FC<IActor> = ({
  _id,
  imgPath,
  name,
  surname,
  register,
}) => {
  const [hasChoosen, setHasChoosen] = useState(false);
  const [removeActor] = useLazyGetActorsQuery();

  const toggleRole = (event: ChangeEvent<HTMLInputElement>) => {
    setHasChoosen(event.target.checked);
  };

  const removeCurrentActor = async () => {
    const res = await axios.delete(`${BASE_URL}/actor/${_id}`);
    removeActor("");
  };

  return (
    <div className="actorsBlock__actorView">
      <img className="actorView__img" src={imgPath} alt="img" />
      <p className="actorView__fullname">
        {name} {surname}
      </p>
      <input
        onChange={toggleRole}
        className="actorView__checkbox"
        type="checkbox"
      />
      <Trash onClick={removeCurrentActor} className="actorView__imgTrash" />
      {hasChoosen && (
        <input
          {...register(`actors.${_id}`)}
          className="actorView__input"
          type="text"
          placeholder="Role"
        />
      )}
    </div>
  );
};
