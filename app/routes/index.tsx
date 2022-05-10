import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
//import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ValidatedForm } from "remix-validated-form";
import { FormInputText } from "~/components/FormInputText";
import { loginValidator } from "~/lib/validatorSchema";
import SubmitButton from "~/components/SubmitButton";
//import { useLoaderData } from "@remix-run/react";
import Link from "@mui/material/Link";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
//import { json } from "@remix-run/node";
import { authenticator } from "~/lib/auth.server";
//import { commitSession, getSession } from "~/lib/session.server";

export default function Login() {
  //const { error } = useLoaderData();
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 15 }}>
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
          Sign in
        </Typography>
        <Typography variant="caption" color="gray" gutterBottom={true}>
          Welome back! Please login to continue
        </Typography>
        <Box
          component={ValidatedForm}
          validator={loginValidator}
          id="signIn"
          method="post"
          sx={{ mt: 1 }}
        >
          <FormInputText name="email" label="Email" sx={{ mb: 3 }} />
          {/*error && <Alert severity="error">{error.message}</Alert>*/}
          <FormInputText name="password" type="password" label="Password" />
          <SubmitButton formId="signIn" title="SignIn" />

          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export const action: ActionFunction = async ({ request, context }) => {
  return await authenticator.authenticate("user", request, {
    successRedirect: "/dashboard/",
    failureRedirect: "/",
  });

  //return student
};

// in the loader of the login route
export let loader: LoaderFunction = async ({ request }) => {
  /*  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });

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
  );*/
  return null;
};
