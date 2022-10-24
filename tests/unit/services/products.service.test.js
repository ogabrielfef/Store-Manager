const { expect } = require('chai');
const sinon = require('sinon');

const { findAll, findById, createProduct } = require('../../../src/services/products.service');
const productModel = require('../../../src/models/products.model');
const { products, invalidValue, newProduct, name } = require('./mocks/products.service.mock');
const sinonChai = require('sinon-chai');

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

describe('Cadastro de novo produto', function () {
  afterEach(sinon.restore);

  it('retorna o produto caso as informações sejam passadas corretamente', async function () {
    sinon.stub(productModel, 'insert').resolves([{ id: 1 }]);
    sinon.stub(productModel, 'findById').resolves(newProduct[0]);

    const result = await createProduct(name);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(newProduct[0]);
  });
});
});
