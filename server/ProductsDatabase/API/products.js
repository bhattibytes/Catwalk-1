const db = require('../DB/database.js');
const { Product, Feature,  Style, Sku, Photo, RelatedProduct } = require('../DB/allProducts.js');

const getAllProducts = (req, res) => {
  Product.findAll({
    limit: 5
  }).then(data => {
   console.log(data);
   var productArr = [];
   data.forEach(product => {
    productArr.push(product.dataValues)
   });
   res.send(productArr);
  })
};

const getProductById = (req, res) => {
  var id = req.params.product_id;
  var features = Feature.findAll({ attributes: ["feature", "value"], where: {'productId': id} });
  var product = Product.findOne({ where: { id: req.params.product_id } });

  Promise.all([features, product])
    .then(data => {
      var features = data[0];
      var product = data[1];
      var featuresArr = [];
      features.map(feature => {
        featuresArr.push(feature.dataValues);
      })
      var copyProduct = {};
      for (var key in product.dataValues) {
        copyProduct[key] = product.dataValues[key];
      }
      copyProduct.features = featuresArr;
      res.status(200);
      res.send(copyProduct);
    })
};

const getAllProductStyles = async (req, res) => {
  var id = req.params.product_id;
  var response = {};
  var styleIds = [];
  var stylesArr = [];
  var styles = Style.findAll({ attributes: ["id", "name", "original_price", "sale_price", "default_style"], where: { 'productId': id } }).then(data => {
    data.forEach(style => {
      styleIds.push(style.dataValues.id);
      stylesArr.push(style.dataValues);
    })
    styleIds.forEach(styleId => {
      Photo.findAll({ attributes: ["fullsize_url", "thumbnail_url"], where: { 'styleId': styleId } })
      .then(photos => {
        var photoArr = [];
        photos.forEach(photo => {
          photoArr.push({fullsize_url: photo.fullsize_url, thumbnail_url: photo.thumbnail_url})
        })
        console.log('Here should be the Arr', photoArr)
        stylesArr.map(style => {
          if (style.id === styleId) {
            style.photos = photoArr
          }
        })
        console.log('Here is the stylesArr after putting in photosArr ---> ', stylesArr)
      })
    })
    response.product_id = id;
    response.results = stylesArr;
    console.log('Here is the response object --->', response)
    res.status(200).send(response);
  })
}

  // Sku.findAll({ attributes: ["id", "size", "quantity"], where: { 'styleId': styleId } })
    //   .then(skus )
const getRelatedProducts = (req, res) => {
  return null
};

module.exports = { getAllProducts, getProductById, getAllProductStyles, getRelatedProducts };