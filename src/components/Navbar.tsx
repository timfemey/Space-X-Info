import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Navbar = () => {
  return (
    <>
      <Typography variant="h4">Navbar</Typography>

      <Link to={"/"}>Home</Link>
      <Link to={"/rocket/:id"}>Rockets</Link>
      <Link to={"/takeoffs"}>TakeOffs</Link>
    </>
  );
};

export default Navbar;
