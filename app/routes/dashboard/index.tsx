import React from "react";
import Grid from "@mui/material/Grid";
import InfoCard from "~/components/InfoCard";
import Paper from "@mui/material/Paper";
import DrugsTable from "~/components/DrugsTable";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  almostFinished,
  expiring,
  getAllDrugs,
  outOfStock,
} from "~/controllers/drugsController";
import SaleComponent from "~/components/SaleComponent";
import { createTransaction } from "~/controllers/transactionController";
import type { Product } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";

const AttendantIndexPage = () => {
  const data = useLoaderData();
  const { outofstock, exp, almostfinished } = data;

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={4}>
        <InfoCard title="Expiry Date Notifications" items={exp.slice(0, 2)} />
      </Grid>
      <Grid item xs={12} md={4}>
        <InfoCard
          title="Out of Stock Notifications"
          items={outofstock.slice(0, 2)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <InfoCard
          title="Almost Finished Notifications"
          items={almostfinished.slice(0, 2)}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 400,
          }}
          elevation={4}
        >
          <DrugsTable />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <SaleComponent />
      </Grid>
    </Grid>
  );
};

export default AttendantIndexPage;

export let loader: LoaderFunction = async ({ request }) => {
  //get all drugs to load here
  const all = await getAllDrugs();
  const outofstock = await outOfStock();
  const exp = await expiring();
  const almostfinished = await almostFinished();
  return {
    all: all,
    outofstock: outofstock,
    exp: exp,
    almostfinished: almostfinished,
  };
};

export type loaderItemsType = {
  all: Product[];
  outofstock: Product[];
  exp: Product[];
  almostfinished: Product[];
};

export let action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const items = data.get("items") as string;

  await createTransaction(JSON.parse(items));
  return redirect("/dashboard/invoice");
};
