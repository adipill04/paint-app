import { Routes, Route, BrowserRouter } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/home";
import Login from "./pages/login"
import Register from "./pages/register"
import Paint from "./pages/paint";
import Gallery from "./pages/gallery";
import ErrorPage from "./pages/error";
import { useAuth } from "./contexts/authContext";

import "./App.css";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

function App() {
  const { loggedIn } = useAuth();
  return (
    <div className="App">
        <BrowserRouter>
          <Navigation />
          <div>ARE WE LOGGED IN? : {loggedIn ? "true" : "false"}</div>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes/>}>
              <Route exact path="/" element={<Home />} />
              <Route path="/paint" element={<Paint />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="gallery/:drawing" element={<Gallery />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
