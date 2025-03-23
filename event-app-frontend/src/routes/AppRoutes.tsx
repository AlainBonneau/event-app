import { Route, Routes } from "react-router";
// Importer les pages une fois qu'elles sont créées
import Home from "../pages/Home";
import EventPage from "../pages/Event";
import EventDetail from "../pages/EventDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CreateEvent from "../pages/CreateEvent";
import AboutMe from "../pages/AboutMe";
import AdminPage from "../pages/AdminEvents";
import AdminUsers from "../pages/AdminUsers";
import UpdateEvent from "../pages/UpdateEvent";
import UpdateUser from "../pages/UpdateUser";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/about-me" element={<AboutMe />} />
      <Route path="/admin/events" element={<AdminPage />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/events/:id" element={<UpdateEvent />} />
      <Route path="/admin/users/:id" element={<UpdateUser />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
