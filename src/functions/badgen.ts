import querystring from "querystring";
import { APIGatewayEvent, ProxyResult } from "aws-lambda";
import { getVersion, InvalidArgumentException } from "../versions";

export async function handler(event: APIGatewayEvent): Promise<ProxyResult> {
  try {
    const [versionRaw, lang] = event.path.split("/").reverse();
    const version = querystring.unescape(versionRaw);

    const result = getVersion(lang, version);

    if (!result) {
      return { statusCode: 404, body: `Version not found` };
    }

    // Docs: https://badgen.net/https
    return {
      statusCode: 200,
      body: JSON.stringify({
        subject: `${lang} ${version}`,
        status: result.eol,
        color: result.isEol ? "red" : "green",
      }),
    };
  } catch (err) {
    if (err instanceof InvalidArgumentException) {
      return { statusCode: 400, body: err.message };
    }

    return { statusCode: 500, body: err.toString() };
  }
}
