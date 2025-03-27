// models/associations.js

// Import all models
const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Inventory = require('./Inventory');
const Order = require('./Order');
const Order_Item = require('./Order_Item');
const Product_Tag = require('./Product_Tag');
const Product_Tags_Product = require('./Product_Tags_Product');
const Product_Image = require('./Product_Image');
const Contact = require('./Contact');
const Order_Coupon = require('./Order_Coupon');
const Coupon = require('./Coupon');
const Review = require('./Review');

//------------------------
// User-Order Relationship
//------------------------
User.hasMany(Order, {
  foreignKey: 'user_id',
  as: 'orders',
});
Order.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

//------------------------
// Order-Order_Item Relationship
//------------------------
Order.hasMany(Order_Item, {
  foreignKey: 'order_id',
  as: 'order_items',
});
Order_Item.belongsTo(Order, {
  foreignKey: 'order_id',
  as: 'order',
});

//------------------------
// Order_Item-Product Relationship
//------------------------
Order_Item.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
});
Product.hasMany(Order_Item, {
  foreignKey: 'product_id',
  as: 'order_items',
});

//------------------------
// Product-Product_Tag Relationship
//------------------------
Product.belongsToMany(Product_Tag, {
  through: Product_Tags_Product,
  foreignKey: 'product_id',
  as: 'tags',
});
Product_Tag.belongsToMany(Product, {
  through: Product_Tags_Product,
  foreignKey: 'tag_id',
  as: 'products',
});

//------------------------
// Product-Product_Image Relationship
//------------------------
Product.hasMany(Product_Image, {
  foreignKey: 'product_id',
  as: 'images',
});
Product_Image.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
});

//------------------------
// Order_Item-Inventory Relationship
//------------------------
Order_Item.belongsTo(Inventory, {
  foreignKey: 'inventory_id',
  as: 'inventory',
});
Inventory.hasMany(Order_Item, {
  foreignKey: 'inventory_id',
  as: 'order_items',
});

//------------------------
// User-Contact Relationship
//------------------------
User.hasMany(Contact, {
  foreignKey: 'user_id',
  as: 'contacts',
});
Contact.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

//------------------------
// Order-Coupon Relationship
//------------------------
Order.belongsToMany(Coupon, {
  through: Order_Coupon,
  foreignKey: 'order_id',
  as: 'coupons',
});
Coupon.belongsToMany(Order, {
  through: Order_Coupon,
  foreignKey: 'coupon_id',
  as: 'orders',
});

//------------------------
// User-Review Relationship
//------------------------
User.hasMany(Review, {
  foreignKey: 'user_id',
  as: 'reviews',
});
Review.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

//------------------------
// Product-Review Relationship
//------------------------
Review.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
});

//------------------------
// Product-Category Relationship
//------------------------
Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products',
});
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category',
});

//------------------------
// Exports
//------------------------
module.exports = {
  User,
  Product,
  Category,
  Inventory,
  Order,
  Order_Item,
  Product_Tag,
  Product_Tags_Product,
  Product_Image,
  Contact,
  Order_Coupon,
  Coupon,
  Review
};
