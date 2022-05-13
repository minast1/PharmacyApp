import React from "react";
import Box from "@mui/material/Box";
//import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { Link } from "@remix-run/react";
import Alert from "@mui/material/Alert";
import { FormInputText } from "~/components/FormInputText";
import ItemBox from "~/components/ItemBox";
import { getAllDrugs } from "~/controllers/drugsController";
import { LoaderFunction } from "@remix-run/node";

const SalePage = () => {
  const [itemCount, setItemCount] = React.useState<string>("");

  return (
    <Grid container>
      <Grid item xs={12}>
        <Alert severity="info" variant="filled">
          Toggle the Dropdown to select the number of items to add to sale.This
          would generate the required fields to capture sale details
        </Alert>
        <Card elevation={4} sx={{ mt: 2 }}>
          <Box display="flex" alignItems="center" sx={{ p: 1 }}>
            <TextField
              sx={{ width: "10%" }}
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Total"
              type="number"
              value={itemCount}
              onChange={(event) => setItemCount(event.target.value)}
              required
              variant="outlined"
            />
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              component={Link}
              to="/dashboard/"
              size="small"
              sx={{ mr: 2 }}
            >
              Back
            </Button>
          </Box>
          <Divider />

          <CardContent>
            <Grid container spacing={2}>
              {Array.from({ length: parseInt(itemCount) }, (_, index) => (
                <Grid item xs={12} key={index}>
                  <ItemBox />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SalePage;

export let loader: LoaderFunction = async ({ request }) => {
  //get all drugs to load here
  return await getAllDrugs();
};
