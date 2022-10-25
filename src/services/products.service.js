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

const updateProduct = async ({ id, name }) => {
  if (!name) {
    return { error: { message: '"name" is required' }, code: 400 };
  }
  if (name.length < 5) {
    return { error: { message: '"name" length must be at least 5 characters long' }, code: 422 };
  }

  const idProduct = await productModel.findById(id);
  if (!idProduct) {
    return { error: { message: 'Product not found' }, code: 404 };
  }

  const product = await productModel.updateProduct({ id, name });
  return { data: product, code: 200 };
};

// const deleteProduct = async (productId) => {
//   await productModel.deleteProduct(productId);
//   const result = await productModel.findById(productId);
//   return { type: null, message: result };
// };

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  // deleteProduct,
};
