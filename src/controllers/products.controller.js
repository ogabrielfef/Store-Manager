const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await productService.findAll();

  // if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const getProducts = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { data, error, code } = await productService.createProduct(name);
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
};

const updateProduct = async (req, res) => {
  console.log(req.params);
  const { data, error, code,
  } = await productService.updateProduct({
    ...req.params,
    ...req.body,
  });
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { data, error, code } = await productService.deleteProduct(id);
if (error) return res.status(code).json(error);
  return res.status(code).json(data);
};

module.exports = {
  listProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
