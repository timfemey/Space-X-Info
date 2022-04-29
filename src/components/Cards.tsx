import { SyntheticEvent } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

interface Props {
  image: string;
  name: string;
  launch_site: string;
  details: string;
  article: string;
}

const Cards = (props: Props) => {
  function copy(e: SyntheticEvent) {
    e.preventDefault();
    navigator.clipboard
      .writeText(props.details)
      .then(() => {
        alert("Copied!");
      })
      .catch((err) => {
        alert("Error while Copying Text");
      });
  }

  function redirect(e: SyntheticEvent) {
    e.preventDefault();
    window.open(props.article, "_blank");
  }
  return (
    <>
      <Card sx={{ maxWidth: 345, marginLeft: "17px", marginTop: "17px" }}>
        <CardMedia
          component="img"
          height="140"
          image={props.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Details:{" "}
            {props.details ? props.details : "Not Yet Released by SpaceX"}
            <br />
            <br />
            Launch Site: {props.launch_site}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={(e) => copy(e)} size="small">
            Copy Details
          </Button>
          <Button onClick={(e) => redirect(e)} size="small">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Cards;
