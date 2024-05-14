import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Actor = {
  _id: number;
  name: string;
  surname: string;
  imgPath: string;
};

type ActorsArr = {
  actorId: string;
  role: string;
};

export type Movie = {
  _id: string;
  title: string;
  description: string;
  country: string;
  genre: string;
  restriction: number;
  releaseDate: string;
  actors: ActorsArr[];
  videoId: string;
  imgPath: string;
};

export type Session = {
  _id: string;
  movieId: string;
  date: string;
  time: string;
};

export type TFeedback = {
  movieId: string;
  userId: string;
  rating: number;
  comment: string;
};

export type TOrder = {
  _id: string;
  userId: string;
  sessionId: string;
  movieId: string;
  numberSeats: string[];
  price: number;
};

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://cinema-api-sand.vercel.app",
    baseUrl: "http://localhost:3333",
  }),
  endpoints: (builder) => ({
    getActors: builder.query<Actor[], string>({
      query: () => "/actor",
    }),
    getActor: builder.query<Actor, string>({
      query: (id) => `/actor/${id}`,
    }),
    getFilms: builder.query<Movie[], string>({
      query: () => "/movie",
    }),
    getFilm: builder.query<Movie, string>({
      query: (id) => `/movie/${id}`,
    }),
    getSessions: builder.query<Session[], string>({
      query: () => "/session",
    }),
    getFeedbacks: builder.query<TFeedback[], string>({
      query: () => "/feedback",
    }),
    getOrders: builder.query<TOrder[], string>({
      query: () => "/order",
    }),
  }),
});

export const {
  useGetActorsQuery,
  useLazyGetActorsQuery,
  useGetFilmsQuery,
  useLazyGetFilmsQuery,
  useLazyGetFilmQuery,
  useGetFilmQuery,
  useGetSessionsQuery,
  useLazyGetSessionsQuery,
  useGetFeedbacksQuery,
  useLazyGetFeedbacksQuery,
  useGetActorQuery,
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
} = appApi;
