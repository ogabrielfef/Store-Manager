const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const result = await salesModel.findById(saleId);
  if (result.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };
  console.log(result);
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
};
