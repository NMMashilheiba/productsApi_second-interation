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
// @routes POST /api/products/create
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { productName } = JSON.parse(body);

    const product = {
      productName,
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-type": "application/json" });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getProducts, getProduct, createProduct };
