import React from "react";
import Grid from "@mui/material/Grid";
import InfoCard from "~/components/InfoCard";
import Paper from "@mui/material/Paper";
import DrugsTable from "~/components/DrugsTable";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { getAllDrugs } from "~/controllers/drugsController";
import SaleComponent from "~/components/SaleComponent";
import type { Item } from "~/lib/itemStore";

const AttendantIndexPage = () => {
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={4}>
        <InfoCard title="Expiry Date Notifications" items={[]} />
      </Grid>
      <Grid item xs={12} md={4}>
        <InfoCard title="Out of Stock Notifications" items={[]} />
      </Grid>
      <Grid item xs={12} md={4}>
        <InfoCard title="Almost Finished Notifications" items={[]} />
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 400,
          }}
          elevation={4}
        >
          <DrugsTable />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <SaleComponent />
      </Grid>
    </Grid>
  );
};

export default AttendantIndexPage;

export let loader: LoaderFunction = async ({ request }) => {
  //get all drugs to load here
  return await getAllDrugs();
};

export let action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const items = data.get("items") as unknown as Item[];
  console.log(items);
  return null;
};
