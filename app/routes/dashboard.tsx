import type { Booking, Session, User } from "@prisma/client";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import Dashboard from "~/components/Dashboard";
import {
  deleteCurrentBooking,
  getAllBookings,
  getCurrentBooking,
  updateBooking,
} from "~/controllers/BookingController";
import { authenticator } from "~/lib/auth.server";

export type userType = Omit<User, "password" | "createdAt">;

export type dataType = {
  user: userType;
  bookings: Booking[];
  tickets: Booking[];
};
const DashboardLayout = () => {
  const data = useLoaderData<dataType>();
  return (
    <Dashboard>
      <Outlet context={data} />
    </Dashboard>
  );
};

export default DashboardLayout;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const button = formData.get("button") as string;
  let Id;
  switch (button) {
    case "route":
      const start_city = formData.get("start_city") as string;
      const destination = formData.get("destination") as string;
      const date = new Date(formData.get("date") as string);
      const session = formData.get("session") as Session;
      Id = formData.get("Id") as string;

      await updateBooking({
        start_city,
        destination,
        date,
        session,
        Id,
      });
      return redirect("/dashboard/selectSeats");
    case "seats":
      Id = formData.get("Id") as string;
      const seats = formData.getAll("seats") as string[];
      const price = Number(formData.get("price") as string);
      await updateBooking({ Id, seats, price });
      return redirect("/dashboard/makePayment");
    case "payment":
      Id = formData.get("Id") as string;
      const paid = JSON.parse(formData.get("paid") as string);
      return await updateBooking({ Id, paid });
    case "cancel":
      Id = formData.get("Id") as string;
      await deleteCurrentBooking(Id);
      return redirect("/dashboard/");
    default:
      return await authenticator.logout(request, { redirectTo: "/" });
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  const bookings = user && (await getCurrentBooking());
  const tickets = user && (await getAllBookings());
  return { user: user, bookings: bookings, tickets: tickets };
};
