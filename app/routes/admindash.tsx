import {
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import Dashboard from "~/components/Dashboard";

import { authenticator } from "~/lib/auth.server";

const DashboardLayout = () => {
  const data = useLoaderData();
  return (
    <Dashboard>
      <Outlet context={data.user} />
    </Dashboard>
  );
};

export default DashboardLayout;

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.logout(request, { redirectTo: "/" });
};

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return user.role === "ATTENDANT" ? redirect("/dashboard/") : { user: user };
};
