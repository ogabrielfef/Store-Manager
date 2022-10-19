const { expect } = require('chai');
const sinon = require('sinon');

const { findAll, findById } = require('../../../src/services/products.service');
const productModel = require('../../../src/models/products.model');
const { products, invalidValue } = require('./mocks/products.service.mock');

describe('Verificando service produto', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(products);

      const result = await findAll();

      expect(result.message).to.deep.equal(products);
    });
  });

describe('busca de um produto', function () {
  afterEach(sinon.restore);
  
  it('retorna um erro caso receba um ID inválido', async function () {
    const result = await findById(invalidValue);

    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"id" must be a number');
  });

  it('retorna um erro caso o produto não existe', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const result = await findById(1);

    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.equal('Product not found');
  });

  it('retorna o produto caso ID existente', async function () {
    sinon.stub(productModel, 'findById').resolves(products[0]);

    const result = await findById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(products[0]);
  });
});
});
