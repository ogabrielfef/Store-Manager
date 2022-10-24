const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
const { expect } = chai;

const { productService } = require('../../../src/services');
const productsController = require('../../../src/controllers/products.controller');
const { products, productMock, newProductMock } = require('./mocks/products.controller.mock');

describe('Teste de unidade do productsController', function () {
  it('Listando os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'findAll')
      .resolves({ type: null, message: products });

    await productsController.listProducts(req, res);

    expect(res.status).to.be.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Buscando um produto', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'findById')
      .resolves({ type: null, message: products[0] });

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it("Testa se falha quando busca um produto inexistente", async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, "findById").resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: "Product not found" });
  });

  it('', async function () {
    const res = {};
    const req = {
      body: productMock,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'createProduct')
      .resolves({ type: null, message: newProductMock });
    
    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductMock);
  });

  afterEach(sinon.restore);
});