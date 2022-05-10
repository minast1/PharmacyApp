import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ValidatedForm } from "remix-validated-form";
import { FormInputText } from "~/components/FormInputText";
import SubmitButton from "~/components/SubmitButton";
import { profileValidator } from "~/lib/validatorSchema";
import { useOutletContext } from "@remix-run/react";
import type { dataType } from "../dashboard";
import type { ActionFunction } from "@remix-run/node";

const ProfilePage = () => {
  const data = useOutletContext<dataType>();

  return (
    <>
      <Paper
        sx={{
          backgroundColor: "white",
          mb: 2,
          mt: 5,
        }}
        elevation={0}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Box
              width="100%"
              display="flex"
              alignItems="flex-start"
              justifyContent="center"
            >
              <img
                alt=""
                src="/profile.png"
                width={400}
                height={400}
                style={{ objectFit: "contain" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              width="100%"
              display="flex"
              pt={10}
              px={2}
              alignItems="center"
              flexDirection="column"
              method="post"
              defaultValues={{
                name: data.user.name,
                email: data.user.email,
                mobile: data.user.mobile,
              }}
              component={ValidatedForm}
              validator={profileValidator}
            >
              <FormInputText name="name" label="User Name" sx={{ mb: 3 }} />
              <FormInputText name="email" label="Email" sx={{ mb: 3 }} />
              <FormInputText
                name="mobile"
                label="Contact Number"
                sx={{ mt: 2 }}
              />

              <SubmitButton formId="profile" title="Save" />
            </Box>
          </Grid>
        </Grid>

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
export default ProfilePage;

export let action: ActionFunction = async ({ request }) => {
  return null;
};
