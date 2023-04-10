import React, { FC } from "react";
import { FormControl, Typography } from "@mui/material";
import styles from "./InputContainer.module.scss";

interface InputProps {
  errorText?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const InputContainer: FC<InputProps> = ({ errorText, children, className, style }) => {
  return (
    <FormControl fullWidth className={[styles.container, className].join(" ")} style={style}>
      {children}
      <Typography
        variant="caption"
        sx={{
          color: "rgb(201, 12, 188)",
        }}
      >
        {errorText}
      </Typography>
    </FormControl>
  );
};

export default InputContainer;
