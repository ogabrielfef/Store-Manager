const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sales } = require('./mocks/sales.model.mock');

describe('Testes de unidade do sales model', function () {
  beforeEach(sinon.restore);

  it('Listando vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);
    const result = await salesModel.findAll();
    expect(result).to.be.deep.equal(sales);
  });

  it('Listando uma venda pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([sales[0]]);
    const result = await salesModel.findById(1);
    expect(result).to.be.deep.equal(sales[0]);
  });
});