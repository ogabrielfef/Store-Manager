const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get(
  '/',
  salesController.listSales,
);

router.get(
  '/:id',
  salesController.getSale,
);

router.delete(
  '/:id',
  salesController.deleteSales,
);

module.exports = router;
