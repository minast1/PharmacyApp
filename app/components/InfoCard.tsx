import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Title from "./Title";
import Button from "@mui/material/Button";
import { Link } from "@remix-run/react";
import type { Product } from "@prisma/client";
import Stack from "@mui/material/Stack";

type appProps = {
  title: string;
  items: Product[] | [];
};

export default function InfoCard({ title, items }: appProps) {
  return (
    <Paper elevation={5} sx={{ p: 2 }}>
      <Title>{title}</Title>
      {items.length ? (
        <Stack spacing={2}>
          {items.map((el: Product) => (
            <Box key={el.id}>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Name: {el.name}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
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
            to="/admindash"
          >
            View Full Details
          </Button>
        </div>
      ) : null}
    </Paper>
  );
}
