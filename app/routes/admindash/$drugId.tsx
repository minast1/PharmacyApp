import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import type { LoaderFunction } from "@remix-run/node";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { findDrugById } from "~/controllers/drugsController";
import Box from "@mui/material/Box";
import { Link, useLoaderData } from "@remix-run/react";
import type { Product } from "@prisma/client";
import { format } from "date-fns";

const DrugDetailsPage = () => {
  const data = useLoaderData<Product>();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card sx={{ mb: 10, mt: 3 }} variant="outlined">
          <Box display="flex" alignItems="center" p={1}>
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
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={6}>
                <img alt="" height={600} width={400} src="/bottle2.jpg" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  //justifyContent="center"
                  mt={3}
                >
                  <Box
                    component={Typography}
                    gutterBottom
                    sx={{
                      flexGrow: 1,
                      fontSize: 23,
                      mb: 2,
                      backgroundColor: "#bbdefb",
                      pl: 1,
                    }}
                  >
                    {" "}
                    Drug Description : {data.name}
                  </Box>
                  <Box
                    component={Typography}
                    sx={{
                      flexGrow: 1,
                      fontSize: 23,
                      mb: 2,
                      backgroundColor: "#bbdefb",
                      pl: 1,
                    }}
                  >
                    {" "}
                    Manufacturer Name : {data.manufacturer}
                  </Box>
                  <Box
                    component={Typography}
                    sx={{
                      flexGrow: 1,
                      fontSize: 23,
                      mb: 2,
                      backgroundColor: "#bbdefb",
                      pl: 1,
                    }}
                  >
                    {" "}
                    Batch Number : {data.batch_no}
                  </Box>
                  <Box
                    component={Typography}
                    sx={{
                      flexGrow: 1,
                      fontSize: 23,
                      mb: 2,
                      backgroundColor: "#bbdefb",
                      pl: 1,
                    }}
                  >
                    {" "}
                    Production Date :{" "}
                    {format(new Date(data.production_date), "PP")}
                  </Box>
                  <Box
                    component={Typography}
                    sx={{
                      flexGrow: 1,
                      fontSize: 23,
                      mb: 2,
                      backgroundColor: "#bbdefb",
                      pl: 1,
                    }}
                  >
                    {" "}
                    Expiry Date : {format(new Date(data.expiry_date), "PP")}
                  </Box>
                  <Box
                    component={Typography}
                    gutterBottom
                    sx={{
                      flexGrow: 1,
                      fontSize: 23,
                      mb: 2,
                      backgroundColor: "#bbdefb",
                      pl: 1,
                    }}
                  >
                    {" "}
                    Price : {data.price} GH₵
                  </Box>
                  <Box
                    component={Typography}
                    sx={{
                      flexGrow: 1,
                      fontSize: 23,
                      mb: 3,
                      backgroundColor: "#bbdefb",
                      pl: 1,
                    }}
                  >
                    {" "}
                    Quantity : {data.quantity}
                  </Box>
                  <Box display="flex">
                    <img alt="" height={200} width={200} src="/fda2.jpg" />
                    <img alt="" height={200} width={200} src="/signed.jpg" />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing></CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DrugDetailsPage;

export let loader: LoaderFunction = async ({ params }) => {
  const id = params.drugId as string;

  return await findDrugById(id);
};
