const { salesModel } = require('../models');
// const { validateId } = require('./validations/validationsValue');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return { type: null, message: sales };
};

const findSalesById = async (productId) => {
  // const errror = validateId(productId);
  // if (errror.type) return errror;

  const sales = await salesModel.findSalesById(productId);
  if (sales) return { type: null, message: sales };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  findAllSales,
  findSalesById,
};
