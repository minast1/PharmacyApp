import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
//import Grid from "@mui/material/Grid";
import type { LoaderFunction } from "@remix-run/node";
import {
  getLatestTransactionDetails,
  type transactionType,
} from "~/controllers/transactionController";
import { Link, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import PrintIcon from "@mui/icons-material/Print";

const InvoicePage = () => {
  const data = useLoaderData<transactionType>();
  const subtotal = data
    .map((items) => Number(items.total))
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  const total = subtotal + 5;
  //console.log(subtotal);

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 3 }}>
      <Paper
        variant="outlined"
        // elevation={1}
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          backgroundColor: "white",
        }}
      >
        <Typography component="h1" variant="h5" align="left">
          Menzbek Pharmacy Ltd.
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: 15 }}>
          {format(new Date(), "dd-MM-yyyy ")} {format(new Date(), "H:m aa")}
        </Typography>
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <Typography variant="subtitle2">REG#90</Typography>
          <Typography variant="subtitle2">TRAN#5176</Typography>
          <Typography variant="subtitle2">CSHR#1052820</Typography>
          <Typography variant="subtitle2">STR#6196</Typography>
        </Box>

        <List disablePadding>
          {data.map((item) => (
            <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={`${item.quantity}  ${item?.product?.name}`}
              />
              <Typography variant="body2">{item.total}Gh₵</Typography>
            </ListItem>
          ))}
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Sub Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Gh₵ {subtotal}
            </Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Sales Tax" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Gh₵ 5.00
            </Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total Charge" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Gh₵ {total}
            </Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <img alt="" height={120} width={300} src="/barcode.jpg" />
          </ListItem>
        </List>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            aria-label="print"
            size="small"
            variant="contained"
            color="success"
            sx={{ mt: 3 }}
          >
            <PrintIcon />
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            component={Link}
            to="/dashboard/"
            prefetch="intent"
            variant="contained"
            size="small"
            sx={{ mt: 3 }}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default InvoicePage;

export let loader: LoaderFunction = async ({ request }) => {
  //get the recent transaction here
  return await getLatestTransactionDetails();
  //return await getAllDrugs();
};
