import { Route, Routes } from "react-router";
// Importer les pages une fois qu'elles sont créées
import Home from "../pages/Home";
import EventPage from "../pages/Event";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventPage />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/events/:id" element={<Event />} />
        <Route path="/events/:id/edit" element={<EventEdit />} />
        <Route path="/events/new" element={<EventNew />} />
        <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
