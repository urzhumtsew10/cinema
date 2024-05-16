import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface INavList {
  id: number;
  text: string;
  isActive: boolean;
}

interface IinitialState {
  officeNavList: INavList[];
  adminNavList: INavList[];
  userNavList: INavList[];
  sessionFilm: string;
}

const initialState: IinitialState = {
  officeNavList: [],
  userNavList: [
    { id: 1, text: "Personal Data", isActive: true },
    { id: 2, text: "Order History", isActive: false },
    { id: 3, text: "Log out", isActive: false },
  ],
  adminNavList: [
    { id: 4, text: "Film", isActive: false },
    { id: 5, text: "Actor", isActive: false },
    { id: 6, text: "Session", isActive: false },
  ],
  sessionFilm: "",
};

const officeSlice = createSlice({
  name: "office",
  initialState,
  reducers: {
    setActiveNavItem: (state, action: PayloadAction<Number>) => {
      const updatedList = state.officeNavList.map((item) => {
        if (item.id === action.payload) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
    },
    generateOfficeList: (state, action: PayloadAction<String>) => {
      if (action.payload === "admin") {
        return {
          ...state,
          officeNavList: [...state.userNavList, ...state.adminNavList],
        };
      } else {
        return {
          ...state,
          officeNavList: state.userNavList,
        };
      }
    },
    setSessionFilm: (state, action: PayloadAction<string>) => {
      return { ...state, sessionFilm: action.payload };
    },
  },
});

export const { setActiveNavItem, generateOfficeList, setSessionFilm } =
  officeSlice.actions;
export default officeSlice.reducer;
