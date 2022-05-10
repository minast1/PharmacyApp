/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//import { useMediaQuery, useTheme } from "@mui/material";
//import { useOutletContext } from "@remix-run/react";

const IndexPage = () => {
  // const navigate = useNavigate();
  //const data = useOutletContext<dataType>();
  // const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Card sx={{ mb: 2, mt: 2, backgroundColor: "white" }} elevation={1}>
        <Box display="flex" alignItems="center" ml={2} mt={2}>
          <Typography variant="h6">I am the attendant index page </Typography>
          <Box flexGrow={1} />
        </Box>

        <CardContent sx={{ borderTop: "1px solid lightgray" }}></CardContent>
      </Card>
    </>
  );
};

export default IndexPage;

export let loader: LoaderFunction = async ({ request }) => {
  //const session = await getSession(request.headers.get("cookie"));
  //const user = session.get("user");

  return null;
};

export let action: ActionFunction = async ({ request }) => {
  return null;
};
