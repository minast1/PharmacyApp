import * as React from "react";
import {
  DataGrid,
  type GridColDef,
  type GridValueGetterParams,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";
import type { Product } from "@prisma/client";

function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search Drug…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}

type prodType = Omit<Product, "price">;
const DrugsTable = () => {
  const parentData = useLoaderData<Product[]>(); ///THIS IS WHAT WE NEED !!!!!!
  const fetcher = useFetcher();
  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState<prodType[] | []>([]);

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = parentData
      ? parentData.filter((row: any) => {
          return Object.keys(row).some((field: any) => {
            return searchRegex.test(row[field].toString());
          });
        })
      : [];
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(parentData);
  }, [parentData]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "DrugName",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "batch_no",
      headerName: "Batch No",
      align: "center",
      type: "string",
      headerAlign: "center",
      width: 160,
    },
    {
      field: "production_date",
      headerName: "Prod. Date",
      align: "center",
      headerAlign: "center",
      width: 150,
      valueFormatter: (params) => {
        //console.log(params.value);
        return format(new Date(params.value), "PP");
      },
    },
    {
      field: "expiry_date",
      align: "center",
      headerAlign: "center",
      headerName: "Exp. Date",
      valueFormatter: (params) => {
        //console.log(params.value);
        return format(new Date(params.value), "PP");
      },
      width: 150,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      align: "center",
      headerAlign: "center",
      width: 200,
    },

    {
      field: "actions",
      headerName: "Actions Area",
      minWidth: 100,
      flex: 1,

      align: "right",
      headerAlign: "right",
      renderCell: (params: GridValueGetterParams) => {
        return (
          <Box display="flex">
            <Button
              variant="contained"
              component={Link}
              to={`/admindash/${params.id}`}
              prefetch="intent"
              size="small"
              sx={{ mr: 3, textTransform: "capitalize" }}
            >
              View
            </Button>

            <Button
              variant="contained"
              size="small"
              id={params.id as string}
              color="error"
              sx={{ textTransform: "capitalize" }}
              onClick={() => {
                fetcher.submit(
                  {
                    button: params.id as string,
                  },
                  { method: "post" }
                );
              }}
            >
              {fetcher.state === "loading" && params.hasFocus ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Delete"
              )}
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        components={{ Toolbar: QuickSearchToolbar }}
        rows={rows}
        disableColumnFilter
        pageSize={10}
        disableColumnMenu
        disableColumnSelector
        disableSelectionOnClick
        loading={rows.length === 0}
        columns={columns}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              requestSearch(event.target.value),
            clearSearch: () => requestSearch(""),
          },
        }}
      />
    </div>
  );
};
export default DrugsTable;
