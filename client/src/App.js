import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/home";
import Login from "./pages/login"
import Register from "./pages/register"
import Paint from "./pages/paint";
import Gallery from "./pages/gallery";
import ErrorPage from "./pages/error";
import { AuthProvider } from "./contexts/authContext";

import "./App.css";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes/>}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/paint" element={<Paint />} />
            <Route exact path="gallery/:drawingId" element={<Gallery />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
