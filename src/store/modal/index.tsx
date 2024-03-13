import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  isAuthUser: Boolean;
  movieId: string;
  filter: any;
  selectedSeats: string[];
}

interface IFilterPayload {
  type: string;
  value: string;
}

const initialState: IinitialState = {
  isAuthUser: false,
  movieId: "",
  filter: { day: "Today", country: "All", genre: "All" },
  selectedSeats: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    resetSelectedSeats: (state) => {
      return { ...state, selectedSeats: [] };
    },
    toggleSelectedSeats: (state, action: PayloadAction<string>) => {
      if (state.selectedSeats.includes(action.payload)) {
        const updateSelectedSeats = state.selectedSeats.filter(
          (seat) => seat !== action.payload
        );
        return { ...state, selectedSeats: updateSelectedSeats };
      } else {
        state.selectedSeats.push(action.payload);
      }
    },
    setIsAuthUser: (state, action: PayloadAction<Boolean>) => {
      return { ...state, isAuthUser: action.payload };
    },
    setMovieId: (state, action: PayloadAction<string>) => {
      return { ...state, movieId: action.payload };
    },
    setFilter: (state, action: PayloadAction<IFilterPayload>) => {
      state.filter[action.payload.type] = action.payload.value;
    },
  },
});

export const {
  setIsAuthUser,
  setMovieId,
  setFilter,
  toggleSelectedSeats,
  resetSelectedSeats,
} = modalSlice.actions;
export default modalSlice.reducer;
