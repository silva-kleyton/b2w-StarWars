const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server.test");
const Planeta = require("../../app/models/Planeta");

const { expect } = chai;
chai.use(chaiHttp);

describe("Planeta", () => {
  let id;
  let nome;
  //rodar antes de qualquer procedimento,para remover os dados da base de teste.
  before(async () => {
    await Planeta.remove({});
  });

  it("teste de cadastro do planeta", async () => {
    const planeta = {
      nome: "Tatooine",
      clima: "Teste",
      terreno: "Teste"
    };

    const resposta = await chai
      .request(server)
      .post("/planeta")
      .send(planeta);

    //Verificar a resposta da requisição
    expect(resposta.body).to.have.property("_id");
    expect(resposta.body).to.have.property("nome");
    expect(resposta.body).to.have.property("clima");
    expect(resposta.body).to.have.property("terreno");
    expect(resposta).to.have.status(200);

    //obtendo os dados, para passar para os próximos testes
    id = resposta.body._id;
    nome = resposta.body.nome;
  });

  it("teste de lista dos planetas", async () => {
    const resposta = await chai.request(server).get("/planeta");

    expect(resposta).to.have.status(200);
  });

  it("teste exibir planeta id", async () => {
    const resposta = await chai.request(server).get(`/planeta/${id}`);

    expect(resposta.body).to.have.property("_id");
    expect(resposta.body).to.have.property("nome");
    expect(resposta.body).to.have.property("clima");
    expect(resposta.body).to.have.property("terreno");
    expect(resposta).to.have.status(200);
  });

  it("teste exibir planeta nome", async () => {
    const resposta = await chai
      .request(server)
      .get(`/buscarPlanetasNome?nome=${nome}`);

    expect(resposta).to.have.status(200);
  });

  it("teste remover planeta", async () => {
    const resposta = await chai.request(server).del(`/planeta/${id}`);

    expect(resposta).to.have.status(200);
  });
});
