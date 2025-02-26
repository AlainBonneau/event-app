import MyNavbar from "./components/MyNavbar";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <MyNavbar />
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
