const express = require("express");
const routes = express.Router();
const PlanetaController = require("./app/controllers/PlanetaController");

//rota para criar o Planeta
routes.post("/planeta", PlanetaController.adicionarPlaneta);

routes.get("/planeta/:id", PlanetaController.buscarPlanetaPorId);
routes.get("/planeta", PlanetaController.listarPlanetas);
routes.delete("/planeta/:id", PlanetaController.removerPlaneta);
routes.get("/buscarPlanetasNome", PlanetaController.buscarPlanetaPorNome);

module.exports = routes;
