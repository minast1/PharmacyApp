import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DrugsTable from "~/components/DrugsTable";
import { Link } from "@remix-run/react";
import Box from "@mui/material/Box";
import { deleteDrug, getAllDrugs } from "~/controllers/drugsController";

const AdminProductsPage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card sx={{ mb: 10, mt: 3 }} elevation={5}>
          <Box display="flex" alignItems="center" p={1}>
            <Typography variant="h6">Products Information Table</Typography>
            <Box flexGrow={1} />
            <Link
              to="/admindash/create"
              //prefetch="intent"
              style={{
                alignSelf: "flex-end",
                marginBottom: 10,
                textDecoration: "none",
              }}
            >
              <Button
                //href="/dashboard/create"
                variant="contained"
                size="small"
                sx={{ textTransform: "capitalize", mr: 2 }}
              >
                Add New Drug
              </Button>
            </Link>
          </Box>

          <CardContent sx={{ borderTop: "1px solid lightgray" }}>
            <DrugsTable />
          </CardContent>
          <CardActions disableSpacing></CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminProductsPage;

export let loader: LoaderFunction = async ({ request }) => {
  //get all drugs to load here
  return await getAllDrugs();
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const Id = formData.get("button") as string;

  return await deleteDrug(Id);
};
