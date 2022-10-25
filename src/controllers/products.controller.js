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

  const result = await productService.createProduct(name);

  // if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(201).json(result.message);
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
// const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   const notFound = await productService.findById(id);

//   if (!notFound.message) {
//     return res.status(404).json({ message: 'Product not found' });
//   }
//   await productService.deletedById(id);
//   return res.status(204).json([]);
// };

module.exports = {
  listProducts,
  getProducts,
  createProduct,
  updateProduct,
  // deleteProduct,
};
