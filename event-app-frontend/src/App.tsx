import MyNavbar from "./components/MyNavbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MyNavbar />
        <main className="main-content flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
