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

// @desc Get Product
// @routes GET /api/products/:id
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
// @desc Gets TOP Products
// @routes GET /api/products/topproducts
async function getTopProducts(req, res) {
  try {
    const products = await Product.findTopProducts();
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// @desc Gets Today's Revenue
// @routes GET /api/products/todayrev
async function getTodayRev(req, res) {
  //   console.log("getTodayRev");
  try {
    const products = await Product.todaysRevenue();
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(products));
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

      const { productName, productQuantity, totalAmount } = JSON.parse(body);

      const productData = {
        productName,
        productQuantity,
        totalAmount,
      };

      const updatedProduct = await Product.update(id, productData);

      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc Delete Product
// @routes DELETE /api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: `Product with ${id} not found.` }));
    } else {
      const removeProduct = await Product.removedProduct(id);
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(removeProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  getTodayRev,
};
