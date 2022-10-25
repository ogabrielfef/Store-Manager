const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const salesService = require('../../../src/services/sales.service');
const { listSales, getSale } = require('../../../src/controllers/sales.controller');
const { vendas } = require('./mocks/sales.controller.mock');

chai.use(sinonChai);
const { expect } = chai;


describe('Teste de unidade do salesController', function () {
  beforeEach(sinon.restore);
  it('Listando as vendas', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findAllSales')
      .resolves({ type: null, message: vendas });

    await listSales(req, res);

    expect(res.status).to.be.been.calledWith(200);
    expect(res.json).to.be.been.calledWith(vendas);
  });

  it('Buscando uma venda', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findSalesById')
      .resolves({ type: null, message: vendas[0] });

    await getSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.be.calledWith(vendas[0]);
  });
});