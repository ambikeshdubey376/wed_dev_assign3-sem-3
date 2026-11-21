const validateProduct = (req, res, next) => {
  const { name, sku, category, price, quantity, reorderLevel } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!sku || typeof sku !== 'string') {
    return res.status(400).json({ error: 'SKU is required' });
  }
  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Category is required' });
  }
  if (price === undefined || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Valid price is required' });
  }
  if (quantity !== undefined && (typeof quantity !== 'number' || quantity < 0)) {
    return res.status(400).json({ error: 'Quantity must be a non-negative number' });
  }
  if (reorderLevel !== undefined && (typeof reorderLevel !== 'number' || reorderLevel < 0)) {
    return res.status(400).json({ error: 'Reorder level must be a non-negative number' });
  }

  next();
};

const validateStockChange = (req, res, next) => {
  const { change } = req.body;
  if (change === undefined || typeof change !== 'number') {
    return res.status(400).json({ error: 'change amount is required and must be a number' });
  }
  next();
};

module.exports = {
  validateProduct,
  validateStockChange
};
