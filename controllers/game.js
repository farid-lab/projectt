const fs = require("fs").promises;
const { getRandomGame } = require("../appModules/api");
const { parseBody } = require("../appModules/http-utils");
const { createRating, updateRating } = require("../appModules/rating-utils");
const config = { 
  PATH_TO_RATING_FILE: "./dataset/rating.json",
  WEIGHT: {

  }
};

async function gameRouteController(req, res) {
  try {
    const body = await parseBody(req);
    const data = JSON.parse(body);
    
    const rating = createRating(data, config.WEIGHT);

    const ratingFile = await fs.readFile(config.PATH_TO_RATING_FILE, "utf-8");
    const ratingArray = JSON.parse(ratingFile);

    const newRating = updateRating(ratingArray, data.id, rating);

    await fs.writeFile(config.PATH_TO_RATING_FILE, JSON.stringify(newRating));

    res.setHeader("Content-Type", "application/json");
    
    res.end(JSON.stringify(newRating.sort((a, b) => b.rating - a.rating)));
    
  } catch (error) {
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}

module.exports = gameRouteController;
