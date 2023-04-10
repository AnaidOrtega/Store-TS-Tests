import { fireEvent, render, screen } from "@testing-library/react";
import { Form } from "../../components";
import { dummyInitialValues } from "../../helpers/dummy/form";

beforeEach(() => render(<Form initialValues={dummyInitialValues} formTitle="Create Product" />));
// FORM CORRECT REANDER
describe("Check if form is mounted", () => {
  test("There must be a Create Product Page", () => {
    const title = screen.queryByText(/Create Product/i);
    expect(title).toBeInTheDocument();
  });
  test("There must be Name, Size and Type fields", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
  });
});
// EMPTY FIELDS ERRORS
describe("Error Validating Messages", () => {
  test("It shoukd display validation error messages", () => {
    // FIRE SUBMIT BUTTON EVENT
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
    // DISPLAY ERROR MESSAGES
    expect(screen.queryByText(/Name is Required/i)).toBeInTheDocument();
    expect(screen.queryByText(/Size is Required/i)).toBeInTheDocument();
  });
});

// ON BLUR ERROR MESSAGES
describe("OnBlur Error Messages", () => {
  test("Should Display Validation Error Message", () => {
    // SHOULD START WITH NO VALIDATION MESSAGES
    expect(screen.queryByText(/Name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Size is required/i)).not.toBeInTheDocument();
    //TRIGGER BLUR EVENT WITH EMPTY VALUES
    fireEvent.blur(screen.getByLabelText(/name/i), {
      target: {
        name: "name",
        value: "",
      },
    });
    fireEvent.blur(screen.getByLabelText(/size/i), {
      target: {
        name: "size",
        value: "",
      },
    });
    // VALIDATION MESSAGES SHOUDL DISPLAY
    expect(screen.queryByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/Size is required/i)).toBeInTheDocument();
  });
});
