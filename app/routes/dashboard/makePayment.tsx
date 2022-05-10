/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useFetcher, useOutletContext } from "@remix-run/react";
import type { dataType } from "../dashboard";
import { format } from "date-fns";
import { capitalize } from "@mui/material";
import type { Prisma } from "@prisma/client";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const PaymentPage = () => {
  const data = useOutletContext<dataType>();
  const fetcher = useFetcher();
  const cancelFetcher = useFetcher();

  const seats = data.bookings[0].seats as Prisma.JsonArray;
  return (
    <Card sx={{ mb: 10, mt: 3, backgroundColor: "white" }} elevation={15}>
      <Box
        display="flex"
        alignItems="center"
        sx={{ width: "100%" }}
        justifyContent="center"
        p={2}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          BOOKING DETAILS
        </Typography>
      </Box>

      <CardContent
        sx={{
          borderTop: "1px solid lightgray",
          borderBottom: "1px solid lightgray",
        }}
      >
        <Box display="flex" sx={{ width: "100%" }}>
          <Stack
            sx={{ width: "40%" }}
            alignItems="center"
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}
          >
            <Typography gutterBottom sx={{ fontSize: 18, fontWeight: "bold" }}>
              Username
            </Typography>
            <Box display="flex" flexDirection="column">
              <Typography
                gutterBottom
                sx={{ fontSize: 18, mb: 2, fontWeight: "bold" }}
              >
                Date
              </Typography>
              <Typography
                gutterBottom
                sx={{ fontSize: 18, mb: 2, fontWeight: "bold" }}
              >
                From
              </Typography>
              <Typography
                gutterBottom
                sx={{ fontSize: 18, mb: 2, fontWeight: "bold" }}
              >
                To
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography
                gutterBottom
                sx={{ fontSize: 18, mb: 2, fontWeight: "bold" }}
              >
                Seat /s
              </Typography>
              {seats.map((_, index) => (
                <Typography
                  gutterBottom
                  key={index}
                  sx={{ fontSize: 18, mb: 2, fontWeight: "bold" }}
                >
                  {`Passenger${index + 1}`}
                </Typography>
              ))}
            </Box>

            <Typography
              gutterBottom
              sx={{ fontSize: 18, mb: 2, fontWeight: "bold" }}
            >
              Ticket Price /s
            </Typography>
            <Typography
              gutterBottom
              sx={{ fontSize: 18, mb: 2, fontWeight: "bold" }}
            >
              Tax (E- Levy)
            </Typography>
            <Typography
              gutterBottom
              sx={{ fontSize: 18, mb: 2, fontWeight: "bold" }}
            >
              Total Sum
            </Typography>
          </Stack>
          <Box flexGrow={1} />
          <Stack
            sx={{ width: "40%", mr: 1 }}
            alignItems="center"
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}
          >
            <Typography gutterBottom sx={{ fontSize: 18 }} noWrap>
              {data.user.name}
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography gutterBottom sx={{ fontSize: 18, mb: 2 }} noWrap>
                {format(new Date(data.bookings[0].date), "PP")}
              </Typography>
              <Typography gutterBottom sx={{ fontSize: 18, mb: 2 }}>
                {capitalize(data.bookings[0].start_city as string)}
              </Typography>
              <Typography gutterBottom sx={{ fontSize: 18, mb: 2 }}>
                {capitalize(data.bookings[0].destination as string)}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography gutterBottom sx={{ fontSize: 18, mb: 2 }}>
                Seat No.
              </Typography>
              {seats.map((el, index) => (
                <Typography
                  gutterBottom
                  key={index}
                  sx={{ fontSize: 18, mb: 2 }}
                >
                  {el}
                </Typography>
              ))}
            </Box>

            <Typography gutterBottom sx={{ fontSize: 18, mb: 2 }}>
              {data.bookings[0].price} GH
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 18, mb: 2 }}>
              20 GH
            </Typography>
            <Typography gutterBottom sx={{ fontSize: 18, mb: 2 }}>
              {(data.bookings[0].price as number) + 20} GH
            </Typography>
          </Stack>{" "}
          {/**Second column */}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <Box display="flex" sx={{ width: "100%" }}>
          <Button
            variant="contained"
            disabled={data.bookings[0].paid ? true : false}
            size="small"
            sx={{ textTransform: "capitalize" }}
            onClick={() => {
              const formData = new FormData();
              formData.append("button", "payment");
              formData.append("Id", data.bookings[0].id);
              formData.append("paid", JSON.stringify(true));
              fetcher.submit(formData, {
                action: "/dashboard",
                method: "post",
              });
            }}
          >
            {fetcher.state === "submitting" ? (
              <CircularProgress color="inherit" size={20} />
            ) : data.bookings[0].paid ? (
              "Paid"
            ) : (
              "Make Payment"
            )}
          </Button>
          <Box flexGrow={1} />
          <Button
            variant="contained"
            onClick={() => {
              const formData = new FormData();
              formData.append("button", "cancel");
              formData.append("Id", data.bookings[0].id);
              cancelFetcher.submit(formData, {
                action: "/dashboard",
                method: "post",
              });

              //Delete the booking and navigate back to the homme page
            }}
            size="small"
            color="error"
            sx={{ textTransform: "capitalize" }}
          >
            Canncel Booking
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PaymentPage;
