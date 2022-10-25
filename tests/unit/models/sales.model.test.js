const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { vendas } = require('./mocks/sales.model.mock');

const connection = require('../../../src/models/connection');


describe('Testes de unidade do model de vendas', function () {
  beforeEach(sinon.restore);

  it('Listando as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([vendas]);
    const result = await salesModel.findAllSales();
    expect(result).to.be.deep.equal(vendas);
  });

  it('Listando uma venda a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[vendas[0]]]);
    const result = await salesModel.findSalesById(1);
    expect(result).to.be.deep.equal(vendas[0]);
  });
});