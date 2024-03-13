import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IListItem {
  id: number;
  text: string;
  name: string;
  isActive: Boolean;
}

interface IinitalState {
  list: IListItem[];
}

const initialState: IinitalState = {
  list: [
    { id: 1, text: "Home", name: "home", isActive: true },
    { id: 2, text: "Films", name: "ticket", isActive: false },
    { id: 3, text: "Feedback", name: "calendar", isActive: false },
    { id: 5, text: "Log out", name: "logout", isActive: false },
  ],
};

export const navListSlice = createSlice({
  name: "navList",
  initialState,
  reducers: {
    setIsActive: (state, action: PayloadAction<Number>) => {
      const listMapping = state.list.map((item) => {
        if (item.id === action.payload) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
    },
  },
});

export const { setIsActive } = navListSlice.actions;
export default navListSlice.reducer;
