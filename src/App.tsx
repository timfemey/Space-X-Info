import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Rockets from "./components/Rockets";
import TakeOffs from "./components/TakeOffs";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// uri: "https://api.spacex.land/graphql",

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/takeoffs" element={<TakeOffs />} />
          <Route path="/rocket/:id" element={<Rockets />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
