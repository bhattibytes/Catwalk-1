const { Client } = require('pg');

const client = new Client({
  user: 'jasonbhatti',
  host: 'localhost',
  database: 'all_products',
  password: '1234',
  port: 5432,
});

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});

const getAllProducts = () => {
  const query = `
  SELECT *
  FROM products
  WHERE id BETWEEN 1 AND 10
  `;
  client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    for (let row of res.rows) {
        console.log(row);
    }
    client.end();
  });
};

const getAllProductStyles = (product_id) => {
  const query = `
    SELECT *
    FROM styles
    WHERE styles."productId"=${product_id}
    `;
  client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    for (let row of res.rows) {
        console.log(row);
    }
    client.end();
  });
};

const getProductFeatures = (product_id) => {
  const query = `
    SELECT *
    FROM features
    WHERE features."productId"=${product_id}
    `;
  client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    for (let row of res.rows) {
        console.log(row);
    }
    client.end();
  });
}

const getProductSkus = (style_id) => {
  const query = `
    SELECT *
    FROM skus
    WHERE skus."styleId"=${style_id}
    `;
  client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    for (let row of res.rows) {
        console.log(row);
    }
    client.end();
  });
}

const getProductPhotos = (style_id) => {
  const query = `
    SELECT photos.fullsize_url, photos.thumbnail_url
    FROM photos
    WHERE photos."styleId"=${style_id}
    `;
  client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    var thumb = [];
    var full = [];
    for (let row of res.rows) {
      thumb.push(row.thumbnail_url);
      full.push(row.fullsize_url);
    }
    var photos = {
      thumb: thumb,
      full: full
    };
    console.log(photos);
    client.end();
  });
}


module.exports = {
  getAllProducts,
  getAllProductStyles,
  getProductFeatures,
  getProductSkus,
  getProductPhotos
}
