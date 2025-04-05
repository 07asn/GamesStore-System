const express = require('express');
const router = express.Router();
const {
  getInventories,
  getInventoryByProductId,
  addInventory,
  updateInventory,
  deleteInventory,
} = require('../controllers/inventoryController');

// Get all inventory items
router.get('/', getInventories);

// Get inventory by product ID
router.get('/product/:product_id', getInventoryByProductId);

// Add new inventory item
router.post('/', addInventory);

// Update inventory item by ID
router.put('/:inventory_id', updateInventory);

// Delete inventory item by ID
router.delete('/:inventory_id', deleteInventory);

module.exports = router;
