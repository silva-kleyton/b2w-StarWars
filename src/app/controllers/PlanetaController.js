const Planeta = require("../models/Planeta");
const https = require("https");
const apiUrl = require("../../services/api");

class PlanetaController {
  async adicionarPlaneta(req, res, next) {
    try {
      const jsonBody = await requisicaoSwApi(
        `${apiUrl.urlSwapi}planets/?search=${req.body.nome}`
      );

      let filmes;

      //Se o valor for indefinido, gerar o valor zero
      if (!jsonBody) {
        filmes = 0;
      } else {
        //Obtendo o número das aparições do filme
        filmes = jsonBody.films.length;
      }

      //salvando os dados na base
      const planeta = await Planeta.create({
        ...req.body,
        aparicoes_filmes: filmes
      });

      return res.json(planeta);
    } catch (error) {
      return next(error);
    }

    function requisicaoSwApi(url) {
      return new Promise((resolve, reject) => {
        https.get(url, res => {
          let data = "";

          res.on("data", result => {
            data += result;
          });

          res.on("close", () => {
            const resultado = JSON.parse(data)["results"][0];
            resolve(resultado);
          });

          res.on("error", err => {
            reject(err);
          });
        });
      });
    }
  }

  async listarPlanetas(req, res, next) {
    try {
      const planeta = await Planeta.find();

      return res.json(planeta);
    } catch (error) {
      return next(error);
    }
  }

  async buscarPlanetaPorNome(req, res, next) {
    try {
      //usando expressão regular para evitar camel sensitive
      const planetas = await Planeta.find({
        nome: new RegExp(req.query.nome, "i")
      });

      return res.json(planetas);
    } catch (error) {
      return next(error);
    }
  }

  async buscarPlanetaPorId(req, res, next) {
    try {
      const planeta = await Planeta.findById(req.params.id);

      return res.json(planeta);
    } catch (error) {
      return next(error);
    }
  }

  async removerPlaneta(req, res, next) {
    try {
      await Planeta.findOneAndDelete(req.params.id);

      return res.send({ mensagem: "Planeta removido" });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new PlanetaController();
