import { Routes, Route, BrowserRouter } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/home";
import Login from "./pages/login"
import Register from "./pages/register"
import Paint from "./pages/paint";
import Gallery from "./pages/gallery";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/paint" element={<Paint />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
