import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";
import SambaClient from "samba-client";
import fs from "fs";
import path from "path";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = async (response: Record<string, unknown>) => {
  await testFsx();

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
export async function testFsx() {
  try {
    let cl = new SambaClient({
      address: "//<ip address>/share",
      username: "<username>",
      password: "<password>",
      // maxProtocol: "SMB3",
    });

    const localFilePath = "Default.aspx";
    const workDir = "/tmp";

    var c = await cl.getFile(
      "Deployments/Application Files/dwsapps-v2/ghw/Default.aspx",
      localFilePath,
      workDir
    );
    const data = fs.readFileSync(path.join(workDir, localFilePath), "utf-8");
    console.log("------------");
    console.log(data);
    console.log("------------");
    console.log(c.valueOf());
    // fs.deleteFile("Default.aspx")
  } catch (error) {
    console.log("here " + error);
  }
}
