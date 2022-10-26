import schema from "./schema";
// import { handlerPath } from "@libs/handler-resolver";

export default {
  image: {
    name: "fsx",
  },
  // handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "hello",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
