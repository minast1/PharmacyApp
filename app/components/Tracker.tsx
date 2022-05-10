import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import type { StepIconProps } from "@mui/material/StepIcon";
import DepartureBoardOutlinedIcon from "@mui/icons-material/DepartureBoardOutlined";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AddCardIcon from "@mui/icons-material/AddCard";
import type { Booking } from "@prisma/client";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient(90deg, #9ebd13 0%, #008552 100%);",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient(90deg, #9ebd13 0%, #008552 100%);",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: "linear-gradient(90deg, #9ebd13 0%, #008552 100%);",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: "linear-gradient(90deg, #9ebd13 0%, #008552 100%);",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <DepartureBoardOutlinedIcon />,
    2: <AirlineSeatReclineExtraIcon />,
    3: <AddCardIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ["Select Route", "Select Seat", "Make Payment"];

const Tracker = ({ booking }: { booking: Booking }) => {
  //React.useEffect(() => {}, [booking]);

  const getActiveStep = (booking: Booking): number => {
    const { start_city, paid, seats } = booking;
    //const seats = booking.seats as Prisma.JsonArray;
    return seats && paid && start_city
      ? 2
      : seats && start_city
      ? 1
      : start_city
      ? 0
      : -1;
  };

  return (
    <Paper
      square
      sx={{
        pt: 4,
        height: 150,
        mt: 3,
        mb: 5,
      }}
      elevation={5}
    >
      <Stepper
        alternativeLabel
        activeStep={getActiveStep(booking)}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
};

export default Tracker;
