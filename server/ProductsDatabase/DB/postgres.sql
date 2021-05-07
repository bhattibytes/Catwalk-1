-- CREATE DATABASE all_products;
-- CREATE SCHEMA product_schema
-- DROP TABLE IF EXISTS product;
-- DROP TABLE IF EXISTS product_features;
-- DROP TABLE IF EXISTS product_styles;
-- DROP TABLE IF EXISTS product_skus;
-- DROP TABLE IF EXISTS product_photos;

-- CREATE TABLE product (
--   product_id INTEGER PRIMARY KEY,
--   name VARCHAR(45) NOT NULL,
--   slogan VARCHAR(255) NOT NULL,
--   description VARCHAR(255)  NOT NULL,
--   category VARCHAR(45),
--   default_price VARCHAR(45)
-- );

-- CREATE TABLE product_features (
--   feature_id SERIAL PRIMARY KEY,
--   product_id INTEGER FOREIGN KEY,
--   feature VARCHAR(45),
--   value VARCHAR(45),
--   CONSTRAINT fk_product
--     FOREIGN KEY(product_id)
--       REFERENCES product(product_id)
-- );

-- CREATE TABLE product_styles (
--   style_id INTEGER PRIMARY KEY,
--   product_id INTEGER FOREIGN KEY,
--   name VARCHAR(45),
--   original_price VARCHAR(45),
--   sale_price VARCHAR(45) NULL,
--   CONSTRAINT fk_product
--     FOREIGN KEY(product_id)
--       REFERENCES product(product_id)
-- );

-- CREATE TABLE product_skus (
--   sku_id INTEGER PRIMARY KEY,
--   style_id INTEGER FOREIGN KEY,
--   size INTEGER,
--   quantity INTEGER,
--   CONSTRAINT fk_product_styles
--     FOREIGN KEY(style_id)
--       REFERENCES product_styles(style_id)
-- );

-- CREATE TABLE product_photos (
--   photo_id SERIAL PRIMARY KEY,
--   style_id INTEGER FOREIGN KEY,
--   fullsize_url VARCHAR(255),
--   thumbnail_url VARCHAR(255),
--   CONSTRAINT fk_product_styles
--     FOREIGN KEY(style_id)
--       REFERENCES product_styles(style_id)
-- );


