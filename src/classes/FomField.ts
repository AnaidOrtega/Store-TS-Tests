export interface InitialValues {
  id: string;
  name: string;
  value: string;
  label?: string;
  required?: boolean;
  type?: "input" | "select";
  errorText: "Size is Required";
}

export class FormField {
  private field: InitialValues;
  private isError: boolean;

  constructor(field: InitialValues) {
    this.field = field;
    this.isError = false;
  }

  get currentField() {
    return this.field;
  }

  get fieldKey() {
    return this.field.name;
  }

  getIsError() {
    return this.isError;
  }

  handleBlur() {
    const { value, required } = this.field;
    if (value === "" && required === true) {
      this.isError = true;
    } else {
      this.isError = false;
    }
  }

  setFieldValue(value: string) {
    this.isError = false;
    this.field = {
      ...this.field,
      value,
    };
  }
}
