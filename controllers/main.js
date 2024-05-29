const staticFile = require("../appModules/http-utils/static-file");
const path = require("path");
const mimeTypes = require("../appModules/http-utils/mime-types");

async function mainRouteController(res, publicUrl, extname) {
    res.statusCode = 200;
    staticFile(res, publicUrl, extname);
  }
  module.exports = mainRouteController;