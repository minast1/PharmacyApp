import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
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
  const formData = await request.formData();
  const button = formData.get("button");
  switch (button) {
    case "signout":
      return await authenticator.logout(request, { redirectTo: "/" });

    default:
      return null;
  }

  //return null;
  //;
};

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return { user: user };
};
