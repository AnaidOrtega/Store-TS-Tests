import React, { FC, useState } from "react";
import { Alert, Button, Container } from "@mui/material";
import styles from "./Form.module.scss";
import { Input, Select } from "../../atoms";
import { FormField } from "../../../classes/FomField";
import { dummyOptions } from "../../../helpers/dummy/form";
import { FormMethod, FormProps } from "../../../classes/FormMethod";
import { HTTP_STATUS } from "../../../helpers/consts/httpStatus";

const Form: FC<FormProps> = ({ initialValues, formTitle, onSubmit }) => {
  const [values, setValues] = useState<FormField[]>(
    initialValues.map((initialVal) => new FormField(initialVal))
  );
  const localValues = new FormMethod(values);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // handle field value change
  const handleValueChange = (a: FormField, v: string) => {
    a.setFieldValue(v);
    setFieldStateChange(a);
  };

  // handle field value change
  const handleBlurField = (a: FormField) => {
    a.handleBlur();
    setFieldStateChange(a);
  };

  const setFieldStateChange = (a: FormField) => {
    localValues.setValue(a);
    setValues(localValues.values);
  };

  // check if form is valid
  const handleCheckIfValid = () => {
    const check = localValues.isValidForm;
    // update state fields
    setValues(localValues.values);
    if (check) {
      setErrorMessage(null);
      handleSubmitValues();
    }
  };

  // submit values
  const handleSubmitValues = async () => {
    try {
      if (onSubmit) {
        const submitData: { [key: string]: string } = {};
        for (const i in values) {
          const key = values[i].fieldKey;
          submitData[key] = values[i].currentField.value;
        }
        // fake API call recieved as a prop
        const response = await onSubmit(submitData);

        // THROW AN ERROR
        if (!response.ok) {
          throw response;
        }

        if (response.status === HTTP_STATUS.SUCCESS) {
          // reset form
          setValues(initialValues.map((initialVal) => new FormField(initialVal)));
          // set success message
          setIsSuccess(true);
          setErrorMessage(null);
        }
      }
    } catch (err) {
      console.log("❌ Error: ", err);
      if (err.status === HTTP_STATUS.NOT_FOUND) {
        setErrorMessage("Error 404, not found");
      } else if (err.status === HTTP_STATUS.ERROR) {
        setErrorMessage("Unexpected Error, please try again");
      } else if (err.status === HTTP_STATUS.INVALID) {
        setErrorMessage("Invalid Form");
      } else {
        setErrorMessage("Failed to Connect");
      }
    }
  };

  return (
    <Container className={styles.container}>
      {formTitle && <h1>{formTitle}</h1>}
      {errorMessage && (
        <Alert severity="error" style={{ marginBottom: 20 }}>
          {errorMessage} ❌
        </Alert>
      )}
      {values.map((a) => {
        const { type, name, value, id, label, errorText } = a.currentField;
        if (type === "input") {
          return (
            <Input
              id={id}
              key={name}
              name={name}
              value={value}
              label={label}
              onBlur={() => handleBlurField(a)}
              onChange={(v) => handleValueChange(a, v)}
              style={{ marginBottom: 10, marginTop: 10 }}
              errorText={a.getIsError() ? errorText : undefined}
            />
          );
        } else if (type === "select") {
          return (
            <Select
              id={id}
              key={name}
              name={name}
              label={label}
              value={value}
              options={dummyOptions}
              style={{ marginTop: 10 }}
              onBlur={() => handleBlurField(a)}
              onChange={(v) => handleValueChange(a, v)}
              errorText={a.getIsError() ? errorText : undefined}
            />
          );
        } else {
          return null;
        }
      })}
      {isSuccess && (
        <Alert severity="success" style={{ marginTop: 20 }}>
          Product successfully saved ✅
        </Alert>
      )}
      <Button
        fullWidth
        role="button"
        color="secondary"
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={handleCheckIfValid}
      >
        Submit
      </Button>
    </Container>
  );
};

export default Form;
