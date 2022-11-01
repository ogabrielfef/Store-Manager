const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
const { expect } = chai;

const { productService } = require('../../../src/services');
const productsController = require('../../../src/controllers/products.controller');
const { products, productMock, newProductMock, productMockInvalid } = require('./mocks/products.controller.mock');

describe('Testes de unidade do products controller', function () {
  beforeEach(sinon.restore);

  it('Listando todos produtos', async function () {
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

  it('Buscando um produto pelo id', async function () {
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

  it('Erro ao buscar produto com id inexistente', async function () {
    const res = {};
    const req = {
      params: 1,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'findById')
      .resolves({ type: 'NOT_FOUND', message: 'Product not found' });

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it("Criando um novo produto", async function () {
    const res = {};
    const req = {
      body: productMock,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, "createProduct")
      .resolves({ type: null, message: newProductMock });

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductMock);
  });

  it('Erro ao tentar criar produto com parâmetro inválido', async function () {
    const res = {};
    const req = {
      body: productMockInvalid,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'createProduct')
      .resolves({ type: 'INVALID_VALUE', message: '"name" is required' });

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '\"name\" is required' });
  });

  it('Atualizando um produto', async function () {
    const res = {};
    const req = {
      params: 1,
      body: productMock,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'updateProduct')
      .resolves({ type: null, message: newProductMock });
    
    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newProductMock);
  });

  it('Erro ao tentar atualizar produto com parâmetro inválido', async function () {
    const res = {};
    const req = {
      params: 1,
      body: productMockInvalid,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'updateProduct')
      .resolves({ type: 'INVALID_VALUE', message: '"name" is required' });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '\"name\" is required' });
  });

  it('Deletando um produto', async function () {
    const res = {};
    const req = {
      params: 1,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'deleteProduct')
      .resolves({ type: null, message: '' });

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Erro ao tentar deletar produto inexistente', async function () {
    const res = {};
    const req = {
      params: 1,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'deleteProduct')
      .resolves({ type: 'NOT_FOUND', message: 'Product not found' });

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});