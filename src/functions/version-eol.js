import { getVersion } from "../versions";

exports.handler = async (event) => {
  try {
    let lang, version;

    if (event.httpMethod === "POST") {
      ({ lang, version } = JSON.parse(event.body));
    } else {
      ({ lang, version } = event.queryStringParameters);
    }

    const result = getVersion(lang, version);

    if (!result) {
      return { statusCode: 404, body: `Version not found` };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    if (err.name === "InvalidArgumentException") {
      return { statusCode: 400, body: err.message };
    }

    return { statusCode: 500, body: err.toString() };
  }
};
