import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
//import { Link } from "@remix-run/react";
import Alert from "@mui/material/Alert";
import ItemBox from "~/components/ItemBox";
import { useStore } from "~/lib/itemStore";
import { useFetcher } from "@remix-run/react";

const SaleComponent = () => {
  const [itemCount, setItemCount] = React.useState<string>("");
  const Items = useStore((state) => state.items);

  const fetcher = useFetcher();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Alert severity="info" variant="filled">
          Toggle the Dropdown to select the number of items to add to sale.This
          would generate the required fields to capture sale details
        </Alert>
        <Card variant="outlined" sx={{ mt: 2 }}>
          <Box display="flex" alignItems="center" sx={{ p: 1 }}>
            <TextField
              sx={{ width: "20%" }}
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Total Items"
              type="number"
              value={itemCount}
              onChange={(event) => setItemCount(event.target.value)}
              required
              variant="outlined"
            />
            <Box sx={{ flexGrow: 1 }} />
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
          <Divider />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%", p: 2 }}
          >
            <Button
              size="small"
              sx={{ width: "40%" }}
              disabled={Items.length ? false : true}
              variant="contained"
              onClick={() => {
                fetcher.submit(
                  { items: JSON.stringify(Items) },
                  { method: "post" }
                );
              }}
            >
              {fetcher.state === "submitting" ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Submit Sale"
              )}
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SaleComponent;
