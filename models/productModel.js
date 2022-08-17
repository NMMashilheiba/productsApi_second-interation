require("dotenv").config();
const products = require("../data/products");
const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@nodeapi.a1u6ibd.mongodb.net/${process.env.MONGO_CLUSTER}?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri);

try {
  client.connect();
} catch (error) {
  console.log(error);
}

function findAll() {
  return new Promise((resolve, reject) => {
    const results = products.listAll(client, { maxNoOfResults: 100 });
    resolve(results);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.findProductById(client, id);
    resolve(product);
  });
}

function findTopProducts() {
  return new Promise((resolve, reject) => {
    const product = products.topSellingProducts(client);
    resolve(product);
  });
}

function create(product) {
  //   console.log(product);
  return new Promise((resolve, reject) => {
    const newProduct = products.createProduct(client, product);
    resolve(newProduct);
  });
}

function update(id, productData) {
  //   console.log(typeof id);
  return new Promise((resolve, reject) => {
    const updatedProduct = products.updateProductById(client, id, productData);
    resolve(updatedProduct);
  });
}

function removedProduct(id) {
  console.log(typeof id);
  return new Promise((resolve, reject) => {
    const deleteProduct = products.deleteProductById(client, id);
    resolve({ message: `Product with id ${id} has been deleted.` });
  });
}

function todaysRevenue() {
  //   console.log("todaysRevenue");
  return new Promise((resolve, reject) => {
    const product = products.todaysSells(client);
    resolve(product);
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  removedProduct,
  findTopProducts,
  todaysRevenue,
};
