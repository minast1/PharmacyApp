/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import AccountMenu from "./AccountMenu";
import AppBar from "@mui/material/AppBar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Tracker from "./Tracker";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Link, useFetcher, useLoaderData, useLocation } from "@remix-run/react";
import type { dataType } from "~/routes/dashboard";
import type { Booking } from "@prisma/client";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

type Props = {
  children: React.ReactNode;
};

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const Dashboard: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const data = useLoaderData<dataType>();
  const currentBooking: Booking | null = data.bookings && data.bookings[0];
  const fetcher = useFetcher();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const paidTickets = data.tickets.filter((el) => el.paid === true);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: isMobile ? "none" : "flex" }}
            >
              <Button
                disableElevation
                size="small"
                variant="contained"
                color="warning"
                onClick={() => {
                  const formData = new FormData();
                  formData.append("userId", data.user.id);
                  fetcher.submit(formData, {
                    method: "post",
                    action: "/dashboard/latestBooking",
                  });
                }}
              >
                Start Booking Now
              </Button>
              <Button
                variant="contained"
                disableElevation
                size="small"
                component={Link}
                to="/dashboard/"
              >
                Home
              </Button>
              <Button
                variant="contained"
                disableElevation
                size="small"
                component={Link}
                to="/dashboard/profile"
              >
                Profile
              </Button>
              <Button
                variant="contained"
                disableElevation
                size="small"
                component={Link}
                to="/dashboard/receipt"
              >
                Receipts
              </Button>
            </Stack>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "flex",
                  md: "flex",
                  //justifyContent: "flex-start",
                },
              }}
            ></Box>
            <AccountMenu />
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: theme.palette.grey[100],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            {(location.pathname === `/dashboard/addRoute` ||
              location.pathname === `/dashboard/selectSeats` ||
              location.pathname === "/dashboard/makePayment") && (
              <Tracker booking={currentBooking} />
            )}
            {children}
          </Container>
        </Box>
        <AppBar
          //position="sticky"
          color="inherit"
          sx={{ top: "auto", bottom: 0, display: isMobile ? "flex" : "none" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
            <IconButton
              component={Link}
              to="/dashboard/"
              prefetch="render"
              color="inherit"
              sx={{ ml: 3 }}
            >
              <HomeOutlinedIcon fontSize="large" />
            </IconButton>
            <StyledFab
              color="secondary"
              disabled={
                location.pathname === "/dashboard/addRoute" ||
                location.pathname === "/dashboard/selectSeats" ||
                location.pathname === "/dashboard/makePayment"
                  ? true
                  : false
              }
              onClick={() => {
                const formData = new FormData();
                formData.append("userId", data.user.id);
                fetcher.submit(formData, {
                  method: "post",
                  action: "/dashboard/latestBooking",
                });
              }}
            >
              <AddIcon />
            </StyledFab>
            <Box flexGrow={1} />
            <IconButton
              color="inherit"
              component={Link}
              to="/dashboard/receipt"
              prefetch="intent"
            >
              <Badge
                badgeContent={
                  location.pathname === "/dashboard/receipt"
                    ? 0
                    : paidTickets.length
                }
                color="error"
              >
                <ReceiptIcon fontSize="large" />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/dashboard/profile"
            >
              <SettingsOutlinedIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
