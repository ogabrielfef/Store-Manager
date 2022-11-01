const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const result = await salesModel.findById(saleId);
  if (result.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: result };
};

const deleteSales = async (saleId) => {
  const salesExist = await salesModel.findById(saleId);
  if (salesExist.length !== 0) {
    await salesModel.deleteSales(saleId);
    return { type: null };
  }
  return { type: 'NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  findAll,
  findById,
  deleteSales,
};
