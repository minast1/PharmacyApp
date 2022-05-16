import React from "react";
import Grid from "@mui/material/Grid";
import InfoCard from "~/components/InfoCard";
import Paper from "@mui/material/Paper";
import Chart from "../../components/Chart";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import {
  almostFinished,
  expiring,
  outOfStock,
} from "~/controllers/drugsController";

const AdminIndexPage = () => {
  const data = useLoaderData();
  const { outofstock, exp, almostfinished } = data;
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={4}>
        <InfoCard title="Expiry Date Notifications" items={exp.slice(0, 2)} />
      </Grid>
      <Grid item xs={12} md={4}>
        <InfoCard
          title="Out of Stock Notifications"
          items={outofstock.slice(0, 2)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <InfoCard
          title="Almost Finished Notifications"
          items={almostfinished.slice(0, 2)}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 370,
          }}
          variant="outlined"
        >
          <Chart />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminIndexPage;

export let loader: LoaderFunction = async ({ request }) => {
  //get all drugs to load here
  //const all = await getAllDrugs();
  const outofstock = await outOfStock();
  const exp = await expiring();
  const almostfinished = await almostFinished();
  return {
    outofstock: outofstock,
    exp: exp,
    almostfinished: almostfinished,
  };
};
