import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// uri: "https://api.spacex.land/graphql",
let mounted: boolean = true;
const query = gql`
  {
    company {
      name
      summary
    }
  }
`;

const Home = () => {
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<any>("");
  useEffect(() => {
    if (mounted) {
      request("https://api.spacex.land/graphql", query)
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          setError(err);
        });
    }
    return () => {
      mounted = false;
    };
  });

  return (
    <div>
      {error ? (
        <Typography pt={4} textAlign={"center"} variant="h2">
          Network Error Occured
        </Typography>
      ) : data.company?.summary ? (
        <Container maxWidth="sm">
          <Typography pt={4} textAlign={"center"} variant="h2">
            {data.company.name}
          </Typography>
          <Typography pt={7} textAlign={"center"} variant="h4">
            {data.company.summary}
          </Typography>
        </Container>
      ) : (
        <div style={{ marginTop: "150px" }}>
          <center>
            {" "}
            <Box>
              <CircularProgress />
            </Box>
          </center>
        </div>
      )}
    </div>
  );
};

export default Home;
