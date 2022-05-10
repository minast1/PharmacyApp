/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DepartureBoardOutlinedIcon from "@mui/icons-material/DepartureBoardOutlined";
import type { ActionFunction } from "@remix-run/node";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormInputText } from "~/components/FormInputText";
import { FormInputDate } from "~/components/FormInputDate";
import SubmitButton from "~/components/SubmitButton";
import { bookingValidator } from "~/lib/validatorSchema";
import { ValidatedForm } from "remix-validated-form";
import { FormInputDropdown } from "~/components/FormInputDropdown";
import { useOutletContext } from "@remix-run/react";
import type { dataType } from "../dashboard";
import Paper from "@mui/material/Paper";

const sessions = [
  { label: "Morning", value: "MORNING" },
  { label: "Afternoon", value: "AFTERNOON" },
  { label: "Evening", value: "EVENING" },
];
const AddRoutePage = () => {
  const data = useOutletContext<dataType>();

  return (
    <>
      <Card sx={{ mb: 5, mt: 3, backgroundColor: "white" }} elevation={1}>
        <Box display="flex" alignItems="center" ml={2} mt={2}>
          <Typography sx={{ fontWeight: "bold" }}>
            Please Provide the Route Details
          </Typography>
          <Box flexGrow={1} />
          <DepartureBoardOutlinedIcon fontSize="large" sx={{ mr: 3, mb: 2 }} />
        </Box>

        <CardContent sx={{ borderTop: "1px solid lightgray" }}>
          <ValidatedForm
            onSubmit={() => {}}
            method="post"
            action="/dashboard"
            defaultValues={{ session: "MORNING" }}
            style={{ display: "flex", flexDirection: "column" }}
            resetAfterSubmit
            id="booking"
            validator={bookingValidator}
          >
            {" "}
            <FormInputText name="start_city" label="From" sx={{ mb: 1 }} />
            <FormInputText
              name="Id"
              value={data.bookings[0]?.id}
              sx={{ display: "none" }}
            />
            <FormInputText
              name="destination"
              label="Destination"
              sx={{ my: 2, mr: 2 }}
            />
            <FormInputDropdown
              name="session"
              label="Session"
              sx={{ mb: 2 }}
              options={sessions}
            />
            <FormInputDate name="date" />
            <SubmitButton value="route" title="Continue" formId="booking" />
          </ValidatedForm>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
      <Paper
        square
        sx={{
          backgroundImage: "url(/u5.jpg)",
          //backgroundPosition: "center",
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
          background:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/vip.jpg")',
          height: 150,
          mb: 2,
          mt: 5,
        }}
        elevation={15}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={5}
          sx={{ color: "white" }}
        >
          <Typography gutterBottom>Shcedule For Today</Typography>
          <Typography>6:00 am</Typography>
          <Typography>1:00 pm</Typography>
          <Typography>3:pm</Typography>
        </Box>
      </Paper>
    </>
  );
};

export default AddRoutePage;

export let action: ActionFunction = async ({ request }) => {
  return null;
};
