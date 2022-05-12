import React from "react";
import Grid from "@mui/material/Grid";
import InfoCard from "~/components/InfoCard";
import Paper from "@mui/material/Paper";
import Chart from "../../components/Chart";

const AdminIndexPage = () => {
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
            height: 370,
          }}
          elevation={5}
        >
          <Chart />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminIndexPage;
