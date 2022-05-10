import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container maxWidth="md" sx={{ mt: 15, px: 5, backgroundColor: "white" }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={7}>
          <Box sx={{ width: "100%" }} display="flex" alignItems="center">
            <img
              style={{
                height: isMobile ? 200 : 400,
                width: isMobile ? 500 : 700,
                objectFit: "contain",
              }}
              src="/travel.png"
              alt=""
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}
