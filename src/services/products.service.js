const { productModel } = require('../models');
const { validateId, validateName } = require('./validations/validationsValue');

const NOT_FOUND_PRODUCT = 'Product not found';

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const errror = validateId(productId);
  if (errror.type) return errror;

  const products = await productModel.findById(productId);
  if (products) return { type: null, message: products };
  return { type: 'NOT_FOUND', message: NOT_FOUND_PRODUCT };
};

const createProduct = async (name) => {
  const error = validateName(name);
  if (error.type) return error;

  const newProductId = await productModel.insert(name);
  const newProduct = await productModel.findById(newProductId);
  if (newProduct) return { type: null, message: newProduct };
  return { type: 'NOT_FOUND', message: NOT_FOUND_PRODUCT };
};

const updateProduct = async ({ id, name }) => {
  const error = validateName(name);
  if (error.type) return error;

  const idProduct = await productModel.findById(id);
  if (idProduct) {
    const product = await productModel.updateProduct({ id, name });
    return { type: null, message: product };
  }
  return { type: 'NOT_FOUND', message: NOT_FOUND_PRODUCT };
};

const deleteProduct = async (productId) => {
  const productExist = await productModel.findById(productId);
  if (productExist) {
    await productModel.deleteProduct(productId);
    return { type: null };
  }
  return { type: 'NOT_FOUND', message: NOT_FOUND_PRODUCT };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};
