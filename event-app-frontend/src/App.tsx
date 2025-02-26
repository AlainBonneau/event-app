import MyNavbar from "./components/MyNavbar";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MyNavbar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
