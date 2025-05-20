const Inventory = require('../models/Inventory');
const { Op } = require('sequelize');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Get all inventories
const getInventories = async (req, res) => {
  try {
      const { 
          page = 1, 
          pageSize = 10,
          search = '',
          status = 'all',
          category = 'all'
      } = req.query;

      // Build the base query
      let whereClause = {};
      let includeClause = [
          {
              model: Product,
              as: 'product',
              attributes: ['name', 'product_id'],
              include: {
                  model: Category,
                  as: 'category',
                  attributes: ['name'],
              },
              required: true
          }
      ];

      // Apply search filter
      if (search) {
          whereClause = {
              ...whereClause,
              [Op.or]: [
                  { asset_code: { [Op.like]: `%${search}%` } },
                  { '$product.name$': { [Op.like]: `%${search}%` } },
                  { '$product.category.name$': { [Op.like]: `%${search}%` } }
              ]
          };
      }

      // Apply status filter
      if (status !== 'all') {
          whereClause.status = status;
      }

      // Apply category filter
      if (category !== 'all') {
          includeClause[0].include.where = { name: category };
      }

      // Parse pagination
      const limit = parseInt(pageSize, 10);
      const offset = (parseInt(page, 10) - 1) * limit;

      // Fetch with count
      const { count, rows } = await Inventory.findAndCountAll({
          where: whereClause,
          include: includeClause,
          limit,
          offset,
          order: [['assigned_at', 'DESC']]
        });

      const totalPages = Math.ceil(count / limit);

      return res.status(200).json({
          inventories: rows,
          pagination: {
              totalItems: count,
              totalPages,
              currentPage: parseInt(page, 10),
              pageSize: limit
          }
      });
  } catch (error) {
      console.error('Error fetching inventories:', error);
      return res.status(500).json({ message: 'Server error' });
  }
};

const exportInventories = async (req, res) => {
  try {
      const inventories = await Inventory.findAll({
          include: [
              {
                  model: Product,
                  as: 'product',
                  attributes: ['name'],
                  include: {
                      model: Category,
                      as: 'category',
                      attributes: ['name'],
                  },
              },
          ],
          order: [['created_at', 'DESC']]
      });

      if (!inventories || inventories.length === 0) {
          return res.status(404).json({ message: 'No inventories found to export!' });
      }

      // Convert to CSV
      const csvData = [
          ['Product Name', 'Category', 'Asset Code', 'Status', 'Assigned At'],
          ...inventories.map(item => [
              item.product?.name || 'Unknown',
              item.product?.category?.name || 'Uncategorized',
              item.asset_code,
              item.status,
              item.assigned_at || 'N/A'
          ])
      ].map(row => row.join(',')).join('\n');

      // Set headers for CSV download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=inventories_export.csv');
      
      return res.status(200).send(csvData);
  } catch (error) {
      console.error('Error exporting inventories:', error);
      return res.status(500).json({ message: 'Server error during export' });
  }
};

// Get inventory by product ID
const getInventoryByProductId = async (req, res) => {
  try {
    const { product_id } = req.params;
    const inventory = await Inventory.findAll({ where: { product_id } });

    if (!inventory || inventory.length === 0) {
      return res.status(404).json({ message: `No inventory found for product ID: ${product_id}` });
    }

    return res.status(200).json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Add a new inventory item
const addInventory = async (req, res) => {
    try {
      const { product_id, asset_code, status, assigned_at } = req.body;
  
      // Validate input
      if (!product_id || !asset_code) {
        return res.status(400).json({ message: 'Product ID and asset code are required.' });
      }
  
      // Create new inventory, let Sequelize auto-generate inventory_id
      const newInventory = await Inventory.create({
        product_id,
        asset_code,
        status: status || 'available',  
        assigned_at: assigned_at || null,  
      });
  
      return res.status(201).json({
        message: 'Inventory added successfully',
        inventory: newInventory,
      });
    } catch (error) {
      console.error('Error adding inventory:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

// Update an existing inventory item
const updateInventory = async (req, res) => {
  try {
    const { inventory_id } = req.params;
    const { status, assigned_at } = req.body;

    const inventory = await Inventory.findByPk(inventory_id);
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory item not found!' });
    }

    // Update the inventory item
    inventory.status = status || inventory.status;
    inventory.assigned_at = assigned_at || inventory.assigned_at;

    await inventory.save();

    return res.status(200).json({
      message: 'Inventory item updated successfully',
      inventory,
    });
  } catch (error) {
    console.error('Error updating inventory:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete an inventory item
const deleteInventory = async (req, res) => {
  try {
    const { inventory_id } = req.params;

    const inventory = await Inventory.findByPk(inventory_id);
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory item not found!' });
    }

    await inventory.destroy();

    return res.status(200).json({
      message: 'Inventory item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting inventory:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getInventories,
  getInventoryByProductId,
  addInventory,
  updateInventory,
  deleteInventory,
};
