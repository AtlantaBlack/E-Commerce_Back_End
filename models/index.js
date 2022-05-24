// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE' // if category gets deleted, associated products will get deleted too
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE' // if category gets deleted, associated products will get deleted too
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag,
  // specify product_id
  { through: ProductTag, foreignKey: "product_id" }
);

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product,
  // specify tag_id
  { through: ProductTag, foreignKey: "tag_id" }
);

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
