import React, { FC } from "react";
import { InputLabel, MenuItem, Select as MUISelect } from "@mui/material";
import { InputContainer } from "../../molecules";

interface ItemProps {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  value?: string;
  label?: string;
  className?: string;
  errorText?: string;
  onBlur?: () => void;
  options?: Array<ItemProps>;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

const Select: FC<SelectProps> = ({
  id,
  name,
  value,
  label,
  style,
  onBlur,
  options,
  onChange,
  className,
  errorText,
}) => {
  return (
    <InputContainer className={className} style={style} errorText={errorText}>
      <InputLabel id={`label-${id}`} color="secondary" htmlFor={id}>
        {label}
      </InputLabel>
      <MUISelect
        fullWidth
        value={value}
        label={label}
        inputProps={{
          id: id,
          name: name,
        }}
        color="secondary"
        labelId="test-select-label"
        onBlur={onBlur}
        onChange={(e) => onChange && onChange(e.target.value as string)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options?.map((o) => (
          <MenuItem key={o.label} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </MUISelect>
    </InputContainer>
  );
};

export default Select;
