/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//import { useMediaQuery, useTheme } from "@mui/material";
import { useOutletContext } from "@remix-run/react";
import styles from "~/styles/carousel.min.css";
import Slider from "~/components/Slider";
import toast, { Toaster } from "react-hot-toast";
import { ToastAlert } from "~/components/ToastAlert";
import type { dataType } from "../dashboard";

const IndexPage = () => {
  // const navigate = useNavigate();
  const data = useOutletContext<dataType>();
  // const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    toast.custom(
      <ToastAlert severity="success">
        Welcome Back! {data.user.name}.. Click on the Action Button to Begin
        Your Booking Process
      </ToastAlert>,
      {
        position: "top-right",
        duration: 7000,
      }
    );
  }, [data.user]);

  return (
    <>
      <Slider />
      <Card sx={{ mb: 2, mt: 2, backgroundColor: "white" }} elevation={1}>
        <Box display="flex" alignItems="center" ml={2} mt={2}>
          <Typography variant="h6">Where do You Want to go...?</Typography>
          <Box flexGrow={1} />
        </Box>

        <CardContent sx={{ borderTop: "1px solid lightgray" }}>
          <iframe
            title="mytitle"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.3629524911203!2d-0.1680644857560083!3d5.660534334164422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9c9435692819%3A0xe90ce65988c21ad6!2sUniversity%20of%20Professional%20Studies%2C%20Accra%20(UPSA)!5e0!3m2!1sen!2sgh!4v1652051332320!5m2!1sen!2sgh"
            width="100%"
            height="450"
            style={{ border: 0 }}
            //allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </CardContent>
        <Toaster containerStyle={{ marginTop: 5 }} />
      </Card>
    </>
  );
};

export default IndexPage;

export let loader: LoaderFunction = async ({ request }) => {
  //const session = await getSession(request.headers.get("cookie"));
  //const user = session.get("user");

  return null;
};

export let action: ActionFunction = async ({ request }) => {
  return null;
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
