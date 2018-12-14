const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/database.teste");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV != "production";

    this.database();
    this.middlewares();
    this.routes();
    this.exception();
  }

  database() {
    mongoose.connect(
      dbConfig.uri,
      {
        //Passando configurações para a versão mais recente do nodejs
        useCreateIndex: true,
        useNewUrlParser: true
      }
    );
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes.js"));
  }

  exception() {
    this.express.use((err, req, res, next) => {
      return res
        .status(err.status || 500)
        .json({ message: err.message, error: err });
    });
  }
}

module.exports = new App().express;
