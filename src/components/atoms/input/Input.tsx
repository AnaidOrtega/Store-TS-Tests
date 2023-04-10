import React, { FC } from "react";
import { TextField } from "@mui/material";
import styles from "./Input.module.scss";
import { InputContainer } from "../../molecules";

interface InputProps {
  id: string;
  name: string;
  label?: string;
  value?: string;
  className?: string;
  onBlur?: () => void;
  errorText?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

const Input: FC<InputProps> = ({
  id,
  name,
  label,
  style,
  value,
  onBlur,
  onChange,
  className,
  errorText,
}) => {
  return (
    <InputContainer errorText={errorText} className={className} style={style}>
      <TextField
        id={id}
        fullWidth
        name={name}
        label={label}
        value={value}
        onBlur={onBlur}
        color="secondary"
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        focused={!!errorText}
        className={[styles.input].join(" ")}
      />
    </InputContainer>
  );
};

export default Input;
