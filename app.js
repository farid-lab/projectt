const http = require("http");
const staticFile = require ("./appModules/http-utils/static-file");
const path = require ("path");
const mimeTypes = require("./appModules/http-utils/mime-types");
const mainRouteController = require ("./controllers/main");
const defaultRouteController = require("./controllers/default");
const gameRouteController = require("./controllers/game");
const voteRouteController = require("./controllers/vote");
const PORT = 3005

const server = http.createServer((req, res) => {
    const url = req.url;
    switch (url) {
        case "/":
            res.statusCode = 200
            mainRouteController (res, "index.html", "html");
            break
        case "/game":
            gameRouteController (res);
            break
        case "/vote":
            voteRouteController(req,res)
            break
          
          default:
            defaultRouteController (res, url);
          
    }
  });

  server.listen(PORT);