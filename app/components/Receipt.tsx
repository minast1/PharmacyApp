import React from "react";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

type AppProps = {
  date: string | Date;
  from: string;
  destination: string;
  status: boolean;
};
export function Receipt({ date, from, destination, status }: AppProps) {
  return (
    <Grid container spacing={1} direction="row">
      <Grid item container direction="column" spacing={2} xs={6} md={6} lg={3}>
        <Grid item>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
            }}
          >
            Date
          </Typography>
        </Grid>
        <Grid item>{format(new Date(date), "dd-MMMM-yyyy")}</Grid>
      </Grid>
      <Grid item container direction="column" spacing={2} xs={6} md={6} lg={3}>
        <Grid item>
          {" "}
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
            }}
          >
            From
          </Typography>
        </Grid>
        <Grid item>{from}</Grid>
      </Grid>
      <Grid item container direction="column" spacing={2} xs={6} md={6} lg={3}>
        <Grid item>
          {" "}
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
            }}
          >
            Destination
          </Typography>
        </Grid>
        <Grid item>{destination}</Grid>
      </Grid>
      <Grid item container direction="column" spacing={2} xs={6} md={6} lg={3}>
        <Grid item>
          {" "}
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
            }}
          >
            Status
          </Typography>
        </Grid>
        <Grid item>
          {" "}
          <Chip
            label={status ? "completed" : "pending"}
            color={status ? "success" : "warning"}
            size="small"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
