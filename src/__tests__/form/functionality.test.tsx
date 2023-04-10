import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form } from "../../components";
import { dummyInitialValues } from "../../helpers/dummy/form";
import { server } from "../mockServer";
import { saveProduct } from "../mockServer/api/product";

// start server before anything
beforeAll(() => server.listen());
// shut down server when done
afterAll(() => server.close());
// render a form before each test
beforeEach(() =>
  render(
    <Form
      initialValues={dummyInitialValues}
      onSubmit={(values) => {
        const response = saveProduct(values);
        return response;
      }}
    />
  )
);

afterEach(() => server.resetHandlers());

describe("Submit Form", () => {
  test("Display success product message", async () => {
    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: {
        name: "name",
        value: "hellow",
      },
    });

    fireEvent.change(screen.getByLabelText(/size/i), {
      target: {
        name: "size",
        value: "10",
      },
    });

    fireEvent.change(screen.getByLabelText(/type/i), {
      target: {
        name: "type",
        value: "electronic",
      },
    });

    fireEvent.click(button);
    await waitFor(() =>
      expect(screen.getByText(/Product successfully saved/i)).toBeInTheDocument()
    );
  });

  test("Display Invalid Form Error", async () => {
    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: {
        name: "name",
        value: "aa",
      },
    });

    fireEvent.change(screen.getByLabelText(/size/i), {
      target: {
        name: "size",
        value: "a",
      },
    });
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByText(/Invalid Form/i)).toBeInTheDocument());
  });
});
