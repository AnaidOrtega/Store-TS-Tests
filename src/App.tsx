import React from "react";
import { Form } from "./components";
import { dummyInitialValues } from "./helpers/dummy/form";
import "./styles/global.scss";
import { saveProduct } from "./__tests__/mockServer/api/product";

function App() {
  return (
    <div>
      <Form
        initialValues={dummyInitialValues}
        formTitle="Add Product"
        onSubmit={(values) => {
          const response = saveProduct(values);
          console.log("REPONSE: ", response);
          return response;
        }}
      />
    </div>
  );
}

export default App;
