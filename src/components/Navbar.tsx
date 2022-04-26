import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import "./Navbar.scss";
import Container from "@mui/material/Container";

const Navbar = () => {
  return (
    <>
      <nav className="nav-wrapper">
        <Link to={"/"}>
          {" "}
          <Typography variant="h5">Home</Typography>
        </Link>

        <Link to={"/rocket/"}>
          <Typography variant="h5">Rockets</Typography>
        </Link>
        <Link to={"/takeoffs"}>
          <Typography variant="h5">TakeOffs</Typography>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
