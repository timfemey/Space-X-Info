import { request, gql } from "graphql-request";
import { useState, SyntheticEvent, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Typography } from "@mui/material";

let mounted: boolean = true;
const query = gql`
  {
    rockets(limit: 10) {
      name
      wikipedia
      type
      description
      height {
        feet
      }
      engines {
        type
        propellant_1
        propellant_2
      }
    }
  }
`;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      center: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface Face {
  rockets: [
    {
      name: string;
      wikipedia: string;
      type: string;
      description: string;
      height: {
        feet: number;
      };
      engines: {
        type: string;
        propellant_1: string;
        propellant_2: string;
      };
    }
  ];
}

const Rockets = () => {
  const [data, setData] = useState<Face | any>({});
  const [value, setValue] = useState<number>(0);
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

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {error ? (
        <Typography pt={4} textAlign={"center"} variant="h2">
          Network Error Occured
        </Typography>
      ) : data.rockets ? (
        <center>
          <div style={{ marginTop: "50px" }}>
            <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
              <Tabs
                value={value}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
              >
                {data.rockets?.map((a: any, b: number) => {
                  return (
                    <Tab
                      key={b}
                      onClick={(e) => handleChange(e, b)}
                      label={a.name}
                    />
                  );
                })}
              </Tabs>
              <h2>
                {data.rockets[value].name} : {data.rockets[value].type}
              </h2>
              <h3>{data.rockets[value].description}</h3>
              <ul style={{ listStyle: "none" }}>
                <li>Height: {data.rockets[value].height.feet}</li>
                <br />
                <li>Engine Info:</li>
                <br />
                <li>Type: {data.rockets[value].engines.type}</li>
                <br />
                <li>
                  Propellant 1: {data.rockets[value].engines.propellant_1}
                </li>
                <br />
                <li>
                  Propellant 2: {data.rockets[value].engines.propellant_2}
                </li>
              </ul>
            </Box>
          </div>
        </center>
      ) : (
        <center>
          <div style={{ marginTop: "150px" }}>
            <Box>
              <CircularProgress />
            </Box>
          </div>
        </center>
      )}
    </>
  );
};

export default Rockets;
