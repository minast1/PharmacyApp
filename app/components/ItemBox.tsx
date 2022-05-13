import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLoaderData } from "@remix-run/react";
import type { Product } from "@prisma/client";
import MenuItem from "@mui/material/MenuItem";
import { useStore } from "~/lib/itemStore";

const ItemBox = () => {
  const [id, setId] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(0);
  const addItem = useStore((state) => state.addItem);
  const [added, setAdded] = React.useState<boolean>(false);
  // const Items = useStore((state) => state.items);
  const removeItem = useStore((state) => state.removeItem);
  //console.log(Items);
  const drugs = useLoaderData<Product[]>();

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          id="outlined-select-drug"
          select
          fullWidth
          size="small"
          label="Select Drug"
          InputLabelProps={{ shrink: true }}
          value={id}
          onChange={(event) => {
            setId(event.target.value);
            //setPrice(selectedItemPrice?.current?.value?.price)
          }}
        >
          {drugs.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={2}>
        <TextField
          fullWidth
          size="small"
          label="Quantity"
          name="quantity"
          InputLabelProps={{ shrink: true }}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          required
          type="number"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <TextField
          size="small"
          fullWidth
          label="Price"
          InputLabelProps={{ shrink: true }}
          name="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
          type="number"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        {added ? (
          <Button
            size="small"
            sx={{ width: "50%" }}
            color="error"
            variant="contained"
            onClick={() => {
              removeItem(id);
              setAdded(false);
            }}
          >
            Remove Item
          </Button>
        ) : (
          <Button
            size="small"
            sx={{ width: "50%" }}
            variant="contained"
            onClick={() => {
              addItem({ productId: id, quantity: quantity, price: price });
              setAdded(true);
            }}
            color="primary"
          >
            Add Item
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default ItemBox;
