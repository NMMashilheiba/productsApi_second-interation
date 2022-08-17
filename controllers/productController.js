const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// @desc Gets All Products
// @routes GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// @desc Gets one Products
// @routes GET /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: `Product with ${id} not found ` }));
    } else {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc Create a product
// @routes POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { productName, productQuantity, totalAmount } = JSON.parse(body);

    const product = {
      productName,
      productQuantity,
      totalAmount,
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-type": "application/json" });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// @desc Update a product
// @routes PUT /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: `Product with ${id} not found ` }));
    } else {
      const body = await getPostData(req);

      const { productName } = JSON.parse(body);

      const productData = {
        productName,
      };

      const updatedProduct = await Product.update(id, productData);

      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getProducts, getProduct, createProduct, updateProduct };
