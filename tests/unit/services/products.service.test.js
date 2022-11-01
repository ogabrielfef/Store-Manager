const { expect } = require('chai');
const sinon = require('sinon');

const { findAll, findById, createProduct, updateProduct, deleteProduct } = require('../../../src/services/products.service');
const productModel = require('../../../src/models/products.model');
const { products, invalidValue, newProduct, name } = require('./mocks/products.service.mock');
const sinonChai = require('sinon-chai');

describe('Testes de unidade do products service', function () {
  afterEach(sinon.restore);
  it('retorna a lista completa de produtos', async function () {
    sinon.stub(productModel, 'findAll').resolves(products);
    const result = await findAll();
    expect(result.message).to.deep.equal(products);
  });
    
  it('retorna um erro caso receba um ID inválido', async function () {
    const result = await findById(invalidValue);
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"id" must be a number');
  });

  it('retorna um erro caso o produto não existe', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    const result = await findById(1);
    expect(result.type).to.equal('NOT_FOUND');
    expect(result.message).to.equal('Product not found');
  });

  it('retorna o produto caso ID existente', async function () {
    sinon.stub(productModel, 'findById').resolves(products[0]);
    const result = await findById(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(products[0]);
  });

  it('retorna erro caso o produto não tenha sido cadastrado', async function () {
    sinon.stub(productModel, 'insert').resolves(1);
    sinon.stub(productModel, 'findById').resolves(undefined);
    const result = await createProduct(name);
    expect(result.type).to.equal('NOT_FOUND');
    expect(result.message).to.equal('Product not found');
  });

  it('retorna o cadastro do produto corretamente', async function () {
    sinon.stub(productModel, 'insert').resolves(1);
    sinon.stub(productModel, 'findById').resolves(newProduct);
    const result = await createProduct(name);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(newProduct);
  });

  it('retorna erro ao tentar cadastrar com um "name" inválido', async function () {
    sinon.stub(productModel, 'insert').resolves({
      "message": "\"name\" length must be at least 5 characters long"
    });
    const result = await createProduct('Mar');
    expect(result.type).to.equal('FORMAT_INVALID');
    expect(result.message).to.deep.equal('\"name\" length must be at least 5 characters long');
  });

  it('retorna o produto com as informações atualizadas', async function () {
    sinon.stub(productModel, 'findById').resolves(products[0]);
    const result = await updateProduct(newProduct);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(newProduct);
  });

  it('retorna erro caso as informações não sejam atualizadas', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    const result = await updateProduct(newProduct);
    expect(result.type).to.equal('NOT_FOUND');
    expect(result.message).to.deep.equal('Product not found');
  });

  it('retorna erro ao tentar atualizar com um "name" inválido', async function () {
    sinon.stub(productModel, 'insert').resolves({"message": "\"name\" is required"});
    const result = await updateProduct({ id: 1 });
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.deep.equal('\"name\" is required');
  });

  it('exclui produto', async function () {
    sinon.stub(productModel, 'findById').resolves(products[0]);
    const result = await deleteProduct(1);
    expect(result.type).to.equal(null);
  });

  it('retorna erro ao tentar excluir um produto inexistente', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    const result = await deleteProduct(1);
    expect(result.type).to.equal('NOT_FOUND');
  });
});
