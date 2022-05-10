/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFetcher, useOutletContext } from "@remix-run/react";
import type { dataType } from "../dashboard";
import type { Session } from "@prisma/client";
import { format } from "date-fns";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { availableSeats } from "~/src/seats";
import Button from "@mui/material/Button";
import { NoSsr, useMediaQuery, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const capitalize = (word: string | Session): string => {
  const firstLetter = word.charAt(0);
  const others = word.slice(1).toLowerCase();
  return firstLetter + others;
};

const SelectSeatsPage = () => {
  const data = useOutletContext<dataType>();
  const [seats, addSeat] = React.useState<string[] | []>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fetcher = useFetcher();

  /*React.useEffect(() => {
    if (fetcher.type === "done") {
      navigate("/dashboard/makePayment", { replace: true });
    }
  }, [fetcher]);*/

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      addSeat([...seats, event.target.value]);
    } else {
      const removedSeat = seats.filter((seat) => seat != event.target.value);
      addSeat(removedSeat);
    }
  };
  const bookingDetails = data.bookings[0];

  return (
    <Card
      sx={{ mb: isMobile ? 12 : 5, mt: 2, backgroundColor: "white" }}
      elevation={10}
    >
      <Box
        display="flex"
        alignItems="center"
        p={1}
        mt={1}
        sx={{ width: "100%" }}
      >
        <Box flexDirection="column" mr="auto">
          <Typography sx={{ fontWeight: "bold" }}>
            {`${bookingDetails.start_city} -> ${bookingDetails.destination}`}
          </Typography>
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {`${format(
              new Date(bookingDetails.date),
              "yyyy-mm-dd"
            )} / ${capitalize(bookingDetails.session as string)}`}
          </Typography>
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Arrival Time : 30 Minutes Before Departure
          </Typography>
        </Box>

        <Box flexDirection="column" mr={1}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            AVBL 30
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            GHS 30.00
          </Typography>
        </Box>
      </Box>

      <CardContent
        sx={{
          borderTop: "1px solid lightgray",
          borderBottom: "1px solid lightgray",
        }}
      >
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(availableSeats).map((item, index) => (
              <Grid item xs={1} sm={1} md={2} key={index}>
                <FormControlLabel
                  control={<Checkbox onChange={handleChange} value={item} />}
                  label={item}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
      <CardActions>
        <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
          <Box display="flex" flexDirection="row">
            <Box
              sx={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Total Price GHS
            </Box>
            <Box flexGrow={1} />
            <Box
              sx={{
                fontSize: 16,
                fontWeight: "bold",
                mr: 3,
              }}
            >
              {`GHS ${seats.length && seats.length * 30} .00`}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            mt={2}
            justifyContent="center"
          >
            <NoSsr>
              <Button
                variant="contained"
                size="small"
                sx={{ width: "50%" }}
                onClick={() => {
                  const price = seats.length * 300;
                  const formData = new FormData();
                  seats.map((el) => formData.append("seats", el));
                  formData.append("button", "seats");
                  formData.append("Id", data.bookings[0].id);
                  formData.append("price", JSON.stringify(price));
                  fetcher.submit(formData, {
                    action: "/dashboard",
                    method: "post",
                  });
                }}
                disabled={seats.length === 0 ? true : false}
              >
                {fetcher.state === "submitting" ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  "Continue"
                )}
              </Button>
            </NoSsr>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default SelectSeatsPage;
