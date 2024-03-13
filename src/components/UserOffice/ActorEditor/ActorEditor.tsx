import { BaseSyntheticEvent, ChangeEvent, FC, useRef, useState } from "react";
import "./ActorEditor.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLazyGetActorsQuery } from "../../../store/api";
import { BASE_URL } from "../../App/App";

export const ActorEditor: FC = () => {
  const [imgUrl, setImgUrl] = useState<any>(null);
  const [addActor] = useLazyGetActorsQuery();

  const openFile = function (file: File) {
    const reader = new FileReader();
    reader.onload = function () {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

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
  const [imgFile, setImgFile] = useState<File | null>(null);

  const uploadRef = useRef<HTMLInputElement>(null);
  const uploadImg = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const changeImgFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      openFile(event.currentTarget.files[0]);
      setImgFile(event.currentTarget.files[0]);
    }
  };

  const tryCreateActor = async (data: IActorForm) => {
    if (!imgFile) return false;

    const formData = new FormData();
    formData.append("img", imgFile);
    const img = await axios.post(`${BASE_URL}/actor/img`, formData);
    if (img.data) {
      const res = await axios.post(`${BASE_URL}/actor`, {
        ...data,
        imgName: imgFile.name,
      });
      addActor("");
      reset();
      setImgUrl("");
      setImgFile(null);
    }
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
      <img
        className="actorEditor__viewImg"
        src={imgUrl}
        alt="view actor image"
      />
    </div>
  );
};
