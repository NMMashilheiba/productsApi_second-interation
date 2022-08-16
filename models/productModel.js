const products = require("../data/products");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://mashil:Mashil123@nodeapi.a1u6ibd.mongodb.net/nodeapi?retryWrites=true&w=majority";
const client = new MongoClient(uri);

try {
  client.connect();
} catch (error) {
  console.log(error);
}

function findAll() {
  return new Promise((resolve, reject) => {
    const results = products.listAll(client, { maxNoOfResults: 10 });
    resolve(results);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

module.exports = { findAll };
