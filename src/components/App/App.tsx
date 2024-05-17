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
import { Loading } from "../Loading/Loading";
import { useAppSelector } from "../../store/hooks";
import { useEffect } from "react";

export const BASE_URL = "https://cinema-api-urzhumtsew.vercel.app";
// export const BASE_URL = "http://localhost:3030";

function App() {
  const isLoading = useAppSelector((state) => state.modal.isLoading);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }
  }, [isLoading]);

  return (
    <div className="app container">
      {isLoading && <Loading />}
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
