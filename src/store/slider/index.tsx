import { createSlice } from "@reduxjs/toolkit";

interface IFilmList {
  title: string;
  description: string;
  restriction: string;
  imgName: string;
  genre: string;
  country: string;
  id: number;
  movieId: string;
}

interface IinitialState {
  filmList: IFilmList[];
}

const initialState: IinitialState = {
  filmList: [
    {
      id: 1,
      title: "Willy Wonka",
      genre: "Fantazy",
      restriction: "12",
      description:
        "Mr Willy Wonka , who is one of the main characters in the story , is an extraordinary man.",
      imgName: "wonka-poster.jpg",
      country: "Canada",
      movieId: "65db8dc03fe5fcb239ab1f4e",
    },
    {
      id: 2,
      title: "Spiderman",
      genre: "Fantazy",
      restriction: "6",
      description:
        "American teenager Peter Parker, a poor sickly orphan, is bitten by a radioactive spider.",
      imgName: "spiderman-poster.jpg",
      country: "USA",
      movieId: "65dc9a08f326561aad3fe815",
    },
    {
      id: 3,
      title: "Aqueman",
      genre: "Fantazy",
      restriction: "10",
      description:
        "A half-Atlantean, half-human who is reluctant to be king of the undersea nation of Atlantis.",
      imgName: "aqueman-poster.jpg",
      country: "Atlantis",
      movieId: "65dc96def326561aad3fe804",
    },
    {
      id: 4,
      title: "Alita: Battle angle",
      genre: "Action",
      restriction: "16",
      description:
        "Set several centuries in the future, the abandoned Alita is found in the scrapyard of Iron City by Ido.",
      imgName: "alita-poster.jpg",
      country: "USA",
      movieId: "65dca092f326561aad3fe824",
    },
    {
      id: 5,
      title: "Avatar 2",
      genre: "Action",
      restriction: "12",
      description:
        "Synopsis. More than a decade after the Na'Vi repelled the human invasion of Pandora.",
      imgName: "avatar-poster.jpg",
      country: "New Zealand",
      movieId: "65e44e62b87f94d2ce4542c9",
    },
  ],
};

const sliderSlice = createSlice({
  name: "slicer",
  initialState,
  reducers: {},
});

export const {} = sliderSlice.actions;
export default sliderSlice.reducer;
