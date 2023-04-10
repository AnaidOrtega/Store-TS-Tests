import { InitialValues } from "../../classes/FomField";

const dummyOptions = [
  { value: "clothing", label: "Clothing" },
  { value: "furniture", label: "Furniture" },
  { value: "electronic", label: "Electronic" },
];

const dummyInitialValues = [
  {
    value: "",
    id: "name",
    name: "name",
    type: "input",
    label: "Name",
    required: true,
    errorText: "Name is Required",
  },
  {
    value: "",
    id: "size",
    name: "size",
    type: "input",
    label: "Size",
    required: true,
    errorText: "Size is Required",
  },
  {
    value: "",
    id: "type",
    name: "type",
    label: "Type",
    type: "select",
    errorText: "Type is Required",
  },
] as InitialValues[];

export { dummyOptions, dummyInitialValues };
