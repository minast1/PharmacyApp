import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@remix-run/node";
//import Tracker from "~/components/Tracker";
import {
  createNewBookingRecord,
  getCurrentBooking,
} from "~/controllers/BookingController";

export const loader: LoaderFunction = async ({ request }) => {
  return await getCurrentBooking();
};

export default function CurrentBooking() {
  return true;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;

  await createNewBookingRecord(userId);
  return redirect("/dashboard/addRoute");
  //create a fresh booking here
};
