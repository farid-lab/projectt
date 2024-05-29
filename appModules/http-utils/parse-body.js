function parseBody(req, callback) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      callback(null, body);
    });
  }

  module.exports = parseBody;