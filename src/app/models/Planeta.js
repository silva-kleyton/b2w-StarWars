const mongoose = require("mongoose");

const PlanetaSchema = new mongoose.Schema({
  nome: {
    //tipo de dado
    type: String,
    //este campo é obrigatório
    required: "Campo nome Obrigatório"
  },
  clima: {
    type: String,
    required: "Campo clima Obrigatório"
  },
  terreno: {
    type: String,
    required: "Campo terreno Obrigatório"
  },
  aparicoes_filmes: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//exportando o model Planeta
module.exports = mongoose.model("Planeta", PlanetaSchema);
