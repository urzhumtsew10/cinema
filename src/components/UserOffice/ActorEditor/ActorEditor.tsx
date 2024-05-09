import { BaseSyntheticEvent, ChangeEvent, FC, useRef, useState } from "react";
import "./ActorEditor.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLazyGetActorsQuery } from "../../../store/api";
import { BASE_URL } from "../../App/App";
import { useStorage } from "../../../firebase/config";

export const ActorEditor: FC = () => {
  const [addActor] = useLazyGetActorsQuery();
  const [imgFile, setImgFile] = useState<File | null>(null);
  const { url } = useStorage(imgFile);

  interface IActorForm {
    name: string;
    surname: string;
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IActorForm>();

  const uploadRef = useRef<HTMLInputElement>(null);
  const uploadImg = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const changeImgFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setImgFile(event.currentTarget.files[0]);
    }
  };

  const tryCreateActor = async (data: IActorForm) => {
    if (!url) return false;
    const res = await axios.post(`${BASE_URL}/actor`, {
      ...data,
      imgPath: url,
    });
    addActor("");
    reset();
    setImgFile(null);
  };

  return (
    <div className="infoPage__actorEditor">
      <form
        onSubmit={handleSubmit(tryCreateActor)}
        className="actorEditor__actorForm"
      >
        <input
          {...register("name", { required: true })}
          className={`actorForm__input ${errors.name && "error"}`}
          type="text"
          placeholder="Enter actor's name"
        />
        <input
          {...register("surname", { required: true })}
          className={`actorForm__input ${errors.surname && "error"}`}
          type="text"
          placeholder="Enter actor's surname"
        />
        <input
          ref={uploadRef}
          onChange={changeImgFile}
          className="actorForm__input"
          type="file"
          accept="image/*"
        />
        <button
          onClick={uploadImg}
          className={`actorForm__customInputFile ${
            imgFile === null && "error"
          }`}
        >
          Upload image
        </button>
        <button className="actorEditor__btn">Create new actor</button>
      </form>
      {imgFile && (
        <img
          className="actorEditor__viewImg"
          src={url}
          alt="view actor image"
        />
      )}
    </div>
  );
};
