import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link, useActionData } from "@remix-run/react";
import Box from "@mui/material/Box";
import { FormInputText } from "~/components/FormInputText";
import { ValidatedForm } from "remix-validated-form";
import { FormInputDate } from "~/components/FormInputDate";
import { FormInputNumber } from "~/components/FormInputNumber";
import SubmitButton from "~/components/SubmitButton";
import { drugValidator } from "~/lib/validatorSchema";
import type { ActionFunction } from "@remix-run/node";
import toast, { Toaster } from "react-hot-toast";
import { addNewDrug } from "~/controllers/drugsController";

const CreateDrugPage = () => {
  const submitted = useActionData();
  React.useEffect(() => {
    submitted &&
      !submitted?.fieldErrors &&
      toast.success(
        "Drug Details Submitted Successfully",

        {
          position: "bottom-right",
          duration: 3000,
          style: { backgroundColor: "#81c784", color: "white" },
        }
      );
  }, [submitted]);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card sx={{ mb: 10, mt: 3 }} variant="outlined">
          <Box display="flex" alignItems="center" p={1}>
            <Typography variant="h6">Add New Drug</Typography>
            <Box flexGrow={1} />
            <Link
              to="/admindash/products"
              //prefetch="intent"
              style={{
                alignSelf: "flex-end",
                marginBottom: 10,
                textDecoration: "none",
              }}
            >
              <Button
                //href="/dashboard/create"
                variant="contained"
                size="small"
                sx={{ textTransform: "capitalize", mr: 2 }}
              >
                Products
              </Button>
            </Link>
          </Box>

          <CardContent sx={{ borderTop: "1px solid lightgray" }}>
            <Box
              component={ValidatedForm}
              validator={drugValidator}
              resetAfterSubmit
              id="drug"
              method="post"
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormInputText name="name" label="Drug Name" />
                </Grid>
                <Grid item xs={6}>
                  <FormInputText name="manufacturer" label="Manufacturer" />
                </Grid>
                <Grid item xs={6}>
                  <FormInputDate
                    name="production_date"
                    label="Production Date"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInputDate name="expiry_date" label="Expiry Date" />
                </Grid>
                <Grid item xs={6}>
                  <FormInputNumber name="price" label="Price" />
                </Grid>
                <Grid item xs={6}>
                  <FormInputNumber name="quantity" label="Quantity" />
                </Grid>
                <Grid item xs={9}>
                  <FormInputText name="batch_no" label="Batch Number" />
                </Grid>
              </Grid>
              <Box display="flex" alignItems="center" justifyContent="center">
                <SubmitButton
                  title="Submit"
                  formId="drug"
                  styles={{ width: "50%" }}
                />
              </Box>
            </Box>
          </CardContent>
          <CardActions disableSpacing></CardActions>
        </Card>
      </Grid>
      <Toaster />
    </Grid>
  );
};

export default CreateDrugPage;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const manufacturer = formData.get("manufacturer") as string;
  const batch_no = formData.get("batch_no") as string;
  const expiry_date = new Date(formData.get("expiry_date") as string);
  const production_date = new Date(formData.get("production_date") as string);
  const quantity = parseInt(formData.get("quantity") as string);
  const price = formData.get("price") as string;

  return await addNewDrug({
    quantity,
    name,
    manufacturer,
    batch_no,
    expiry_date,
    production_date,
    price,
  });
};
