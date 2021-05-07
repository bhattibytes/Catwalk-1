const Sequelize = require('sequelize');
const db = require('./database.js');


const Product = db.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  slogan: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  category: {
    type: Sequelize.STRING
  },
  default_price: {
    type: Sequelize.STRING
  }
}, {timestamps: false});

const RelatedProduct = db.define('relatedProduct', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
}, {timestamps: false})

Product.belongsToMany(Product, { as: 'relatedProducts', through: RelatedProduct });

const Feature = db.define('feature', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  feature: {
    type: Sequelize.STRING,
    allowNull: true
  },
  value: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {timestamps: false});

Feature.belongsTo(Product);

const Style = db.define('style', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  original_price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sale_price: {
    type: Sequelize.STRING,
    allowNull: true
  },
  default_style: {
    type: Sequelize.INTEGER
  }
}, {timestamps: false});

Style.belongsTo(Product);

const Sku = db.define('sku', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  size: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  }
}, {timestamps: false});

Sku.belongsTo(Style);

const Photo = db.define('photo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fullsize_url: {
    type: Sequelize.STRING
  },
  thumbnail_url: {
    type: Sequelize.STRING
  }
}, {timestamps: false});

Photo.belongsTo(Style);

module.exports = { Product, Feature,  Style, Sku, Photo, RelatedProduct };




