import { useState, useEffect, Key } from "react";
import { request, gql } from "graphql-request";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Cards from "./Cards";

let mounted: boolean = true;
const query = gql`
  {
    launchesPast(limit: 15) {
      mission_name
      launch_site {
        site_name_long
      }
      links {
        article_link
        flickr_images
      }
      id
    }
  }
`;

const TakeOffs = () => {
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
  console.log(data);
  return (
    <>
      {error ? (
        <Typography pt={4} textAlign={"center"} variant="h2">
          Network Error Occured
        </Typography>
      ) : data.launchesPast ? (
        <>
          {data.launchesPast.map(
            (
              val: {
                mission_name: string;
                launch_site: { site_name_long: string };
                links: { flickr_images: string };
              },
              i: Key | null | undefined
            ) => {
              <Cards
                key={i}
                name={val.mission_name}
                launch_site={val.launch_site.site_name_long}
                image={
                  val.links.flickr_images[0] ? val.links.flickr_images[0] : ""
                }
              />;
            }
          )}
        </>
      ) : (
        <>
          <center>
            <div style={{ marginTop: "150px" }}>
              <Box>
                <CircularProgress />
              </Box>
            </div>
          </center>
        </>
      )}
    </>
  );
};

export default TakeOffs;
