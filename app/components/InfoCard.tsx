import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Title from "./Title";
import Button from "@mui/material/Button";
import { Link } from "@remix-run/react";
import type { Product } from "@prisma/client";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

type appProps = {
  title: string;
  items: Product[] | [];
};

export default function InfoCard({ title, items }: appProps) {
  return (
    <Paper
      elevation={5}
      sx={{
        p: 2,
        height: 220,
        backgroundColor: title.includes("Expiry")
          ? "#FFE53B"
          : title.includes("Stock")
          ? "#00DBDE"
          : "#FF3CAC",
        backgroundImage: title.includes("Expiry")
          ? "linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)"
          : title.includes("Stock")
          ? "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)"
          : "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
      }}
    >
      <Title>{title}</Title>
      <Divider sx={{ backgroundColor: "black", my: 1 }} />
      {items.length ? (
        <Stack spacing={1}>
          {items.map((el: Product) => (
            <Box key={el.id}>
              <Typography sx={{ flex: 1, color: "black", fontWeight: "bold" }}>
                Name: {el.name}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ flex: 1, color: "black", fontWeight: "bold" }}
              >
                Batch Id: {el.batch_no}
              </Typography>
            </Box>
          ))}
        </Stack>
      ) : (
        <Box>
          <img alt="" src="not_found.png" width={80} height={70} />
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            No Items To Display
          </Typography>
        </Box>
      )}
      {items.length ? (
        <div style={{ marginTop: 1 }}>
          <Button
            component={Link}
            variant="contained"
            size="small"
            fullWidth
            to="#"
          >
            View Full Details
          </Button>
        </div>
      ) : null}
    </Paper>
  );
}
