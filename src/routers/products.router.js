const express = require('express');
const productController = require('../controllers/products.controller');

const router = express.Router();

router.get(
  '/',
  productController.listProducts,
);

router.get(
  '/:id',
  productController.getProducts,
);

router.post(
  '/',
  productController.createProduct,
);

router.put(
  '/:id',
  productController.updateProduct,
);

router.delete(
  '/:id',
  productController.deleteProduct,
);

module.exports = router;
