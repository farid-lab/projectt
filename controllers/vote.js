const parseBody = require("../appModules/http-utils/parse-body");
const { config, createRating, updateRating } = require("../appModules/rating");

async function voteRouteController(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 404;
    res.end("Not Found");
    return; 
  }

  try {
    const body = await parseBody(req);
    console.log(body);

    let rating;
    if (body.isNew) {
      rating = createRating(body);
    } else {
      rating = updateRating(body);
    }

    res.statusCode = 200;
    res.end("Success!");
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}

module.exports = voteRouteController;