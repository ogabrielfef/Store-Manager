const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
const { expect } = chai;

const { salesService } = require('../../../src/services');
const salesController = require('../../../src/controllers/sales.controller');
const { sales } = require('./mocks/sales.controller.mock');

describe('Testes de unidade do sales controller', function () {
  beforeEach(sinon.restore);

  it('Listando todas vendas', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findAll')
      .resolves({ type: null, message: sales });
    
    await salesController.listSales(req, res);

    expect(res.status).to.be.been.calledWith(200);
    expect(res.json).to.be.an.calledWith(sales);
  });

  it('listando uma venda', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findById')
      .resolves({ type: null, message: sales[0] });

    await salesController.getSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.be.calledWith(sales[0]);
  });
});