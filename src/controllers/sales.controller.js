const { findAllSales, findSalesById } = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const listSales = async (_req, res) => {
  const { message } = await findAllSales();

  // if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await findSalesById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  listSales,
  getSale,
};
