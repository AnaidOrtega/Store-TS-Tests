import { ReqProps } from "../__tests__/mockServer";
import { FormField, InitialValues } from "./FomField";

export interface FormProps {
  formTitle?: string;
  initialValues: InitialValues[];
  onSubmit?: (data: ReqProps["body"]) => Promise<Response>;
}

export class FormMethod {
  private initialValues: FormField[];

  constructor(initialValues: FormField[]) {
    this.initialValues = initialValues;
  }

  get values(): FormField[] {
    return this.initialValues;
  }

  get isValidForm(): boolean {
    const validFields: boolean[] = this.initialValues.map((field) => {
      field.handleError();
      // update class field
      this.setValue(field);
      if (field.getIsError()) {
        return false;
      }
      return true;
    });
    const check = validFields.every((v) => v === true);
    return check;
  }

  setValue(field: FormField) {
    const localValues = [...this.initialValues];
    const changeIndex = localValues.findIndex((val) => field.fieldKey === val.fieldKey);
    localValues[changeIndex] = field;
    this.initialValues = localValues;
  }
}
