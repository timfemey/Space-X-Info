import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
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
  useEffect(() => {
    if (mounted) {
      request("https://api.spacex.land/graphql", query).then((data) => {
        setData(data);
      });
    }
    return () => {
      mounted = false;
    };
  });

  return (
    <div>
      {data.company?.summary ? (
        <Container maxWidth="sm">
          <Typography pt={4} textAlign={"center"} variant="h2">
            {data.company.name}
          </Typography>
          <Typography pt={7} textAlign={"center"} variant="h4">
            {data.company.summary}
          </Typography>
        </Container>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Home;
