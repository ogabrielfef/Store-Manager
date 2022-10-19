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

module.exports = router;
