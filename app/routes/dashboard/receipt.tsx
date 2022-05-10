import { Receipt } from "./../../components/Receipt";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReceiptIcon from "@mui/icons-material/Receipt";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { getAllBookings } from "~/controllers/BookingController";
import type { Booking } from "@prisma/client";
import { useMediaQuery, useTheme } from "@mui/material";
import Slider from "~/components/Slider";
import styles from "~/styles/carousel.min.css";

const ReceiptPage = () => {
  const data = useLoaderData<Booking[]>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Slider />
      <Card sx={{ mb: 5, mt: 3, backgroundColor: "white" }} elevation={0}>
        <Box display="flex" alignItems="center" ml={2} mt={2}>
          <Typography sx={{ fontWeight: "bold" }}>
            Booking Recipts History
          </Typography>
          <Box flexGrow={1} />
          <ReceiptIcon fontSize="large" sx={{ mr: 3, mb: 2 }} />
        </Box>

        <CardContent sx={{ borderTop: "1px solid lightgray" }}>
          {data.length ? (
            <List component="nav">
              {data.map((el) => (
                <div key={el.id}>
                  <ListItem>
                    <Receipt
                      date={el.date}
                      from={el.start_city as string}
                      destination={el.destination as string}
                      status={el.paid}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <Box display="flex" alignItems="center" justifyContent="center">
              <img
                src="/not_found.png"
                style={{ height: 400, width: isMobile ? 400 : 500 }}
                alt=""
              />
            </Box>
          )}
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </>
  );
};

export default ReceiptPage;

export let loader: LoaderFunction = async ({ request }) => {
  return await getAllBookings();
};
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
