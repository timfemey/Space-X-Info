import { request, gql } from "graphql-request";
import { useState, useEffect } from "react";
import RocketFormat from "./RocketFormat";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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
    <>
      {data.rockets ? (
        <center>
          <div style={{ marginTop: "150px" }}>
            {data.rockets?.map((a: any, b: any) => {
              console.log(a, b);
              <RocketFormat data={a} />;
            })}
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
