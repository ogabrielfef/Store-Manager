const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProduct, updateProduct, id } = require('./mocks/products.model.mock');

describe('Testes de unidade do products model', function () {
  beforeEach(sinon.restore);
  it('Listando os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(products);
  });

  it('Listando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const result = await productModel.findById(1);
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastrando novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await productModel.insert(newProduct);
    expect(result).to.equal(1);
  });

  it('Atualizando um produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves(updateProduct);
    const result = await productModel.updateProduct(updateProduct);
    expect(result).to.be.deep.equal(updateProduct);
  });

  it('Deletando um produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves(id);
    const result = await productModel.deleteProduct(id);
    expect(result).to.be.deep.equal(id);
  });
});