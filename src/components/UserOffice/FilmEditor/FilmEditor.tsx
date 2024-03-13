import { BaseSyntheticEvent, ChangeEvent, FC, useRef, useState } from "react";
import "../FilmEditor/FilmEditor.scss";
import {
  useGetActorsQuery,
  useLazyGetActorsQuery,
  useLazyGetFilmsQuery,
} from "../../../store/api";
import { ActorView } from "./ActorView";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../App/App";

export interface IFilm {
  title: string;
  description: string;
  country: string;
  genre: string;
  restriction: number;
  releaseDate: string;
  actors: any;
}

export const FilmEditor: FC = () => {
  const { data } = useGetActorsQuery("");
  const todayDate = new Date();
  const mouth =
    todayDate.getMonth() + 1 < 10
      ? `0${todayDate.getMonth() + 1}`
      : todayDate.getMonth() + 1;
  const [videoUrl, setVideoUrl] = useState<any>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const inputVideoRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [refreshActors] = useLazyGetActorsQuery();
  const [refreshFilms] = useLazyGetFilmsQuery();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IFilm>();
  const checkboxesBlockRef = useRef<HTMLDivElement | null>(null);

  const getFormattingActorsArray = (data: IFilm) => {
    if (!data.actors) return [];
    const actorsId = Object.keys(data.actors);
    const actorsRole = Object.values(data.actors);
    const actors = [];
    for (let i in actorsId) {
      actors.push({ actorId: actorsId[i], role: actorsRole[i] });
    }
    return actors;
  };

  const openFile = function (file: File) {
    const reader = new FileReader();
    reader.onload = function () {
      setVideoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadVideo = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    if (inputVideoRef.current) {
      inputVideoRef.current.click();
    }
  };

  const uploadImage = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    if (inputImageRef.current) {
      inputImageRef.current.click();
    }
  };

  const changeVideoFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      openFile(event.currentTarget.files[0]);
      setVideoFile(event.currentTarget.files[0]);
    }
  };

  const changeImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setImgFile(event.currentTarget.files[0]);
    }
  };

  const tryCreateFilm = async (data: any) => {
    if (videoFile === null || imgFile === null) return;
    let formData = new FormData();
    formData.append("file", videoFile);

    const file = await axios.post(`${BASE_URL}/movie/file`, formData);
    formData = new FormData();
    formData.append("img", imgFile);
    formData.delete("file");
    const img = await axios.post(`${BASE_URL}/movie/poster`, formData);
    const res = await axios.post(`${BASE_URL}/movie`, {
      ...data,
      actors: getFormattingActorsArray(data),
      videoName: videoFile.name,
      imgName: imgFile.name,
    });
    reset();
    setVideoUrl("");
    setVideoFile(null);
    refreshActors("");
    refreshFilms("");
  };

  return (
    <div className="infoPage__filmEditor">
      <form
        onSubmit={handleSubmit(tryCreateFilm)}
        className="filmEditor__filmForm"
      >
        <input
          {...register("title", { required: true })}
          className={`filmForm__input ${errors.title && "error"}`}
          type="text"
          placeholder="Title..."
        />
        <input
          {...register("genre", { required: true })}
          className={`filmForm__input ${errors.genre && "error"}`}
          type="text"
          placeholder="Genre..."
        />
        <input
          {...register("country", { required: true })}
          className={`filmForm__input ${errors.country && "error"}`}
          type="text"
          placeholder="Country..."
        />
        <input
          {...register("restriction", { required: true })}
          className={`filmForm__input ${errors.restriction && "error"}`}
          type="number"
          min={0}
          max={18}
          placeholder="Restriction..."
        />
        <input
          {...register("releaseDate", { required: true })}
          className={`filmForm__input ${errors.releaseDate && "error"}`}
          type="date"
          min={`${todayDate.getFullYear()}-${mouth}-${todayDate.getUTCDate()}`}
          max="2025-01-01"
        />
        <input
          onChange={changeVideoFile}
          ref={inputVideoRef}
          className="filmForm__input"
          type="file"
          accept="video/*"
        />
        <input
          onChange={changeImageFile}
          ref={inputImageRef}
          className="filmForm__input"
          type="file"
          accept="image/*"
        />
        <div className="filmForm__uploadsBtn">
          <button
            onClick={uploadVideo}
            className={`filmForm__customInputFile ${
              videoUrl === null && "error"
            }`}
          >
            Upload Video
          </button>
          <button
            onClick={uploadImage}
            className={`filmForm__customInputFile ${
              imgFile === null && "error"
            }`}
          >
            Upload Image
          </button>
        </div>
        <textarea
          {...register("description", { required: true })}
          className={`filmForm__input description ${
            errors.description && "error"
          }`}
          placeholder="What about this video?(in short)"
        ></textarea>
        <button className="filmForm__btn">Create new Film</button>
      </form>
      <div className="filmEditor__otherFilmInfo">
        <video className="otherFIlmInfo__video" controls src={videoUrl}></video>
        <div ref={checkboxesBlockRef} className="otherFilmInfo__actorsBlock">
          {data &&
            data.map(({ _id, imgPath, name, surname }) => (
              <ActorView
                key={_id}
                _id={_id}
                register={register}
                imgPath={imgPath}
                name={name}
                surname={surname}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
