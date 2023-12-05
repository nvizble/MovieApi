const emCartaz = require("../controllers/onTheaters");
const healthCheck = require("../controllers/healthCheck");
const search = require("../controllers/search");
const express = require("express");
const movieById = require("../controllers/movieById");
const rotas = express();

rotas.get("/", healthCheck);
rotas.get("/cinemas", emCartaz);
rotas.get("/search", search);
rotas.get("/filme/:id", movieById);

module.exports = rotas;
