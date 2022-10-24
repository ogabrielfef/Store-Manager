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

const createProduct = async (name) => {
  // const error = validateName(name);
  // if (error.type) return error;

  const newProductId = await productModel.insert(name);
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};
