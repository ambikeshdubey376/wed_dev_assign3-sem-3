const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateStock,
  deleteProduct,
  getLowStockReport,
  getCategorySummary
} = require('../controller/productController');
const {
  validateProduct,
  validateStockChange
} = require('../middleware/validate');

router.get('/low-stock', getLowStockReport);
router.get('/summary', getCategorySummary);

router.post('/', validateProduct, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.patch('/:id', updateProduct);
router.patch('/:id/stock', validateStockChange, updateStock);
router.delete('/:id', deleteProduct);

module.exports = router;
