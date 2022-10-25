const { salesModel } = require('../models');
// const { validateId } = require('./validations/validationsValue');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return { type: null, message: sales };
};

const findSalesById = async (productId) => {
  const sales = await salesModel.findSalesById(productId);
  if (sales.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sales };
};

module.exports = {
  findAllSales,
  findSalesById,
};
