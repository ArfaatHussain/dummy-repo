const fetch = require("node-fetch");

exports.handler = async (event) => {
  // ⚠️ Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: "",
    };
  }

  try {
    const backendUrl =
      "http://pdf-backend-env.eba-cauaw3hk.eu-north-1.elasticbeanstalk.com" +
      event.path.replace(/^\/\.netlify\/functions\/proxy/, "");

    const options = {
      method: event.httpMethod,
      headers: event.headers,
      body: ["GET", "HEAD"].includes(event.httpMethod) ? null : event.body,
    };

    const response = await fetch(backendUrl, options);
    const text = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: "Proxy error: " + err.message,
    };
  }
};