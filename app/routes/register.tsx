import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Layout from "~/src/Layout";
import { ValidatedForm } from "remix-validated-form";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import { useLoaderData } from "@remix-run/react";
import { registerValidatior } from "~/lib/validatorSchema";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FormInputText } from "~/components/FormInputText";
import FormHelperText from "@mui/material/FormHelperText";
import SubmitButton from "~/components/SubmitButton";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { authenticator } from "~/lib/auth.server";
import { commitSession, getSession } from "~/lib/session.server";

export default function Register() {
  const { error } = useLoaderData();

  //const isSubmitting = useIsSubmitting("signUp");
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <CssBaseline />
      <Paper
        sx={{
          //marginTop: 8,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: 3,

          alignItems: "center",
        }}
        square
        elevation={8}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Sign up
        </Typography>
        <Typography variant="caption" color="darkgray">
          Welome! Please fill in the required details to register
        </Typography>
        <Box
          component={ValidatedForm}
          validator={registerValidatior}
          id="signIn"
          method="post"
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInputText name="name" label="User Name" />
            </Grid>
            <Grid item xs={12}>
              <FormInputText name="email" label="Email Address" />
            </Grid>
            <Grid item xs={12}>
              <FormInputText name="password" label="Password" type="password" />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                name="confirm"
                label="Password Confirmation"
                type="password"
              />
            </Grid>
          </Grid>
          <SubmitButton
            title="Register"
            formId="register"
            styles={{ mt: 3, mb: 2 }}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export const action: ActionFunction = async ({ request, context }) => {
  await authenticator.authenticate("user", request, {
    successRedirect: "/dashboard/",
    failureRedirect: "/register",
  });
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey);
  return json(
    { error },
    {
      headers: {
        // only necessary with cookieSessionStorage
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};
