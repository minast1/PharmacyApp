import * as React from "react";
import Typography from "@mui/material/Typography";

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Typography
      component="h2"
      variant="h6"
      align="center"
      sx={{ color: "black" }}
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}
