import { setupServer } from "msw/node";
import { rest } from "msw";
import { HTTP_STATUS } from "../../helpers/consts/httpStatus";

export interface ReqProps {
  body: {
    [key: string]: string;
  };
}

const server = setupServer(
  rest.post("/products", (req: ReqProps, res, ctx) => {
    // expected properties
    const { name, type, size } = req.body;
    console.log(req.body);

    // validation messages
    if (name && type && size !== "") {
      return res(ctx.status(HTTP_STATUS.SUCCESS));
    }
    return res(ctx.status(HTTP_STATUS.INVALID));
  })
);

export { server };
