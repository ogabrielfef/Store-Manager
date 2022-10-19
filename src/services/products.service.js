const { productModel } = require('../models');
const { validateId } = require('./validations/validationsValue');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const errror = validateId(productId);
  if (errror.type) return errror;

  const products = await productModel.findById(productId);
  if (products) return { type: null, message: products };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
};
