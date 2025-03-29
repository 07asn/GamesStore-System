//controller/categoryController.js
const Category = require('../models/Category');
const { uploadImage } = require('../services/imgService');
const cloudinary = require('cloudinary').v2;

async function getCategories(req, res) {
  try {
    const categories = await Category.findAll();
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: 'No categories found!' });
    }
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function createCategory(req, res) {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    let imageUrl = null;
    
    // If there's an uploaded file, upload it to Cloudinary first
    if (req.file) {
      const fileBuffer = req.file.buffer;
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'categories' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(fileBuffer);
      });
      imageUrl = result.secure_url;
    }

    const newCategory = await Category.create({
      name,
      description,
      image_url: imageUrl,
    });

    return res.status(201).json({
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// Update category
async function updateCategory(req, res) {
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;

    const category = await Category.findOne({ where: { category_id: categoryId } });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Handle image upload if file exists
    if (req.file) {
      const fileBuffer = req.file.buffer;
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'categories' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(fileBuffer);
      });
      category.image_url = result.secure_url;
    }

    category.name = name ?? category.name;
    category.description = description ?? category.description;
    
    await category.save();

    return res.status(200).json({
      message: 'Category updated successfully',
      category,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

async function deleteCategory(req, res) {
  try {
    const categoryId = req.params.id;

    const category = await Category.findOne({ where: { category_id: categoryId } });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.is_deleted = true;
    await category.save();

    return res.status(200).json({
      message: 'Category soft-deleted successfully',
      category,
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function restoreCategory(req, res) {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.is_deleted = false;
    await category.save();

    return res.status(200).json({ message: 'Category restored successfully', category });
  } catch (error) {
    console.error('Error restoring category:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getCategories, createCategory, updateCategory, deleteCategory, restoreCategory };
