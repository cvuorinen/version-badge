import { APIGatewayEvent, ProxyResult } from "aws-lambda";
import { getVersion, InvalidArgumentException } from "../get-version";

export async function handler(event: APIGatewayEvent): Promise<ProxyResult> {
  try {
    let lang, version;

    if (event.httpMethod === "POST") {
      ({ lang, version } = JSON.parse(event.body || "{}"));
    } else {
      ({ lang, version } = event.queryStringParameters || {});
    }

    const result = getVersion(lang, version);

    if (!result) {
      return { statusCode: 404, body: `Version not found` };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
  } catch (err) {
    if (err instanceof InvalidArgumentException) {
      return { statusCode: 400, body: err.message };
    }

    return { statusCode: 500, body: err.toString() };
  }
}
