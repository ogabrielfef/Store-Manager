const { expect } = require('chai');
const sinon = require('sinon');
const { findAll, findById, deleteSales } = require('../../../src/services/sales.service')
const salesModel = require('../../../src/models/sales.model');
const { sales } = require('./mocks/sales.service.mock');
const sinonChai = require('sinon-chai');

describe('Testes de unidade do sales service', function () {
  afterEach(sinon.restore);

  it('retorna a lista completa de vendas', async function () {
    sinon.stub(salesModel, 'findAll').resolves(sales);
    const result = await findAll();
    expect(result.message).to.deep.equal(sales);
  });

  it('retorna a venda caso o ID exista', async function () {
    sinon.stub(salesModel, 'findById').resolves(sales[0]);
    const result = await findById(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(sales[0]);
  });

  it('retorna erro caso o ID não exista', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const result = await findById(1);
    expect(result.type).to.equal('NOT_FOUND');
    expect(result.message).to.equal('Sale not found');
  });

  it('exclui uma venda', async function () {
    sinon.stub(salesModel, 'findById').resolves(sales[0]);
    const result = await deleteSales(1);
    expect(result.type).to.equal(null);
  });

  it('retorna erro ao tentar excluir uma venda inexistente', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const result = await deleteSales(1);
    expect(result.type).to.equal('NOT_FOUND');
  });
});