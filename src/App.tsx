import Navbar from "./components/Navbar";
import Rockets from "./components/Rockets";
import TakeOffs from "./components/TakeOffs";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/takeoffs" element={<TakeOffs />} />
          <Route path="/rocket/" element={<Rockets />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
