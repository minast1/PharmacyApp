import React from "react";
//import Box from "@mui/material/Box";
//import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
//import { Link } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

const SalePage = () => {
  // const [itemCount, setItemCount] = React.useState<string>("");

  return (
    <Grid container>
      <Grid item xs={12}>
        I am the invoice page
      </Grid>
    </Grid>
  );
};

export default SalePage;

export let loader: LoaderFunction = async ({ request }) => {
  //get all drugs to load here
  //return await getAllDrugs();
};
