import { Route, Routes } from "react-router";
// Importer les pages une fois qu'elles sont créées
import Home from "../pages/Home";
import EventPage from "../pages/Event";
import EventDetail from "../pages/EventDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/profile" element={<Profile />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
