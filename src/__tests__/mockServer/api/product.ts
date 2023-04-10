import { ReqProps } from "..";

const saveProduct = async (data: ReqProps["body"]): Promise<Response> => {
  // simulate API call for testing
  const response = await fetch("/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res)
    .catch((e) => {
      console.log("❌ ERROR: ", e);
    });
  return response as Response;
};

export { saveProduct };
