import { Route, Routes } from "react-router-dom";
import { AuthorizationModal } from "../AuthorizationModal/AuthorizationModal";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { HomePage } from "../HomePage/HomePage";
import { Navigation } from "../Navigation/Navigation";
import "./App.scss";
import { UserOffice } from "../UserOffice/UserOffice";
import { FilmPage } from "../FilmPage/FilmPage";
import { BookingPage } from "../BookingPage/BookingPage";

export const BASE_URL = "https://cinema-api-sand.vercel.app";
// export const BASE_URL = "http://localhost:3333";

function App() {
  return (
    <div className="app container">
      <Navigation />
      <section className="app__mainSection">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/:modal" element={<AuthorizationModal />} />
          <Route path="/office" element={<UserOffice />} />
          <Route path="/film/:filmId" element={<FilmPage />} />
          <Route path="/booking/:filmId" element={<BookingPage />} />
        </Routes>
        <Footer />
      </section>
    </div>
  );
}

export default App;
