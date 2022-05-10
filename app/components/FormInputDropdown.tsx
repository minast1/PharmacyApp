import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useField } from "remix-validated-form";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

type FormInputProps = TextFieldProps & {
  options: OptionProps[];
};

type OptionProps = {
  label: string;
  value: any;
};

export const FormInputDropdown = ({
  name,
  options,
  ...props
}: FormInputProps) => {
  const { getInputProps, error, defaultValue } = useField(name as string);

  return (
    <TextField
      helperText={error ? <span style={{ color: "red" }}>{error}</span> : null}
      size="small"
      key={defaultValue}
      select
      {...getInputProps({ id: name })}
      {...props}
      variant="outlined"
    >
      {options.map((option: any) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
