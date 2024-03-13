import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navList";
import sliderReducer from "./slider";
import modalReducer from "./modal";
import officeReducer from "./office";
import { appApi } from "./api";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    slider: sliderReducer,
    modal: modalReducer,
    office: officeReducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
