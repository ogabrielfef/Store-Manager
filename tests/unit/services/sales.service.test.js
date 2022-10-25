const { expect } = require('chai');
const sinon = require('sinon');

const { findAllSales, findSalesById } = require('../../../src/services/sales.service');
const { salesModel } = require('../../../src/models');

const { vendas } = require('./mocks/sales.service.mock');

const sinonChai = require('sinon-chai');

describe('Listando vendas', function () {
  afterEach(sinon.restore);

  it('lista todas as vendas', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(vendas);
    const result = await findAllSales();
    expect(result.message).to.deep.equal(vendas);
  });

  it('retorna um erro caso a venda não exista', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves(undefined);

    const result = await findSalesById(1);

    expect(result.type).to.equal('SALE_NOT_FOUND');
    expect(result.message).to.equal('Sale not found');
  });

  it('retorna o venda caso ID existenta', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves(vendas[0]);

    const result = await findSalesById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(vendas[0]);
  });
});