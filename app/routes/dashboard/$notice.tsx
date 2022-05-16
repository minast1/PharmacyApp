import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import type { LoaderFunction } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import {
  almostFinished,
  expiring,
  outOfStock,
} from "~/controllers/drugsController";
import type { Product, User } from "@prisma/client";
import DrugNotice from "~/components/DrugNotice";

const Notifications = () => {
  let { notice } = useParams();
  const data = useLoaderData<Product[]>();
  const user = useOutletContext<User>();

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 3 }}>
      <Paper
        variant="outlined"
        // elevation={1}
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          backgroundColor: "white",
        }}
      >
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {notice}
        </Typography>
        <Divider />
        <DrugNotice rows={data} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            component={Link}
            to={user.role === "ADMIN" ? "/admindash/" : "/dashboard/"}
            prefetch="intent"
            variant="contained"
            size="small"
            sx={{ mt: 3 }}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Notifications;

export let loader: LoaderFunction = async ({ params }) => {
  const noticeId = params.notice;
  switch (noticeId) {
    case "Expiry Date Notifications":
      return await expiring();

    case "Out of Stock Notifications":
      return await outOfStock();

    case "Almost Finished Notifications":
      return await almostFinished();
  }
  // console.log(noticeId);
  return null;
};
