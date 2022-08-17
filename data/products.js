var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
// var time =
//   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date;

async function listAll(
  client,
  { maxNoOfResults = Number.MAX_SAFE_INTEGER } = {}
) {
  var res = [];
  const cursor = client
    .db("nodeapi")
    .collection("productsSells")
    .find({})
    .limit(maxNoOfResults);

  const results = await cursor.toArray();
  var docs = results;

  if (results.length > 0) {
    // console.log(docs);
    return docs;
  } else {
    console.log(`No listing found `);
  }
}

async function findProductById(client, id) {
  const result = await client
    .db("nodeapi")
    .collection("productsSells")
    .findOne({ _id: parseInt(id) });
  //   console.log(typeof parseInt(id));

  if (result) {
    return result;
  } else {
    console.log(`No product with the id ${id}`);
  }
}

async function getNextSequenceValue(client, sequenceName) {
  var sequenceDocument = await client
    .db("nodeapi")
    .collection("counters")
    .updateOne(
      {
        _id: sequenceName,
      },
      { $inc: { sequence_value: 1 } }
    );
  //   console.log(sequenceDocument);
}

async function createProduct(client, product) {
  await getNextSequenceValue(client, "productid");

  const newId = await client
    .db("nodeapi")
    .collection("counters")
    .findOne({ _id: "productid" });
  const newProduct = await client
    .db("nodeapi")
    .collection("productsSells")
    .insertOne({
      _id: newId.sequence_value,
      productName: product.productName,
      productQuantity: product.productQuantity,
      totalAmount: product.totalAmount,
      date: dateTime,
    });
  const result = {
    _id: newProduct.insertedId,
    productName: product.productName,
    productQuantity: product.productQuantity,
    totalAmount: product.totalAmount,
    date: dateTime,
  };
  //   console.log(typeof newProduct.insertedId);
  return result;
}

async function updateProductById(client, productId, productData) {
  //   console.log(typeof productId);
  const updatedProduct = await client
    .db("nodeapi")
    .collection("productsSells")
    .updateOne({ _id: parseInt(productId) }, { $set: productData });

  const resultData = {
    _id: parseInt(productId),
    productName: productData.productName,
    productQuantity: productData.productQuantity,
    totalAmount: productData.totalAmount,
  };

  return resultData;
}

async function deleteProductById(client, id) {
  const deletedProduct = await client
    .db("nodeapi")
    .collection("productsSells")
    .deleteOne({ _id: parseInt(id) });
}

async function topSellingProducts(client) {
  var res = [];
  const pipeline = [
    {
      $group: {
        _id: "$productName",
        quantity: {
          $sum: "$productQuantity",
        },
      },
    },
    {
      $sort: {
        quantity: -1,
      },
    },
    {
      $limit: 5,
    },
  ];

  const cursor = await client
    .db("nodeapi")
    .collection("productsSells")
    .aggregate(pipeline);

  const docs = await cursor.toArray();
  //   console.log(docs);
  return docs;
}

async function todaysSells(client) {
  const cursor = await client
    .db("nodeapi")
    .collection("productsSells")
    .find({ date: dateTime });

  const docs = await cursor.toArray();
  var results = docs;

  //   console.log(docs);

  return results;
}

// async function todaysRevenue(client, dateTime) {
//   var res = 0;
//   const pipeline = [
//     {
//       $group: {
//         _id: "$dateTime",
//         todayrev: {
//           $sum: "$amount",
//         },
//       },
//     },
//   ];

//   const cursor = await client
//     .db("nodeapi")
//     .collection("productSalesRecord")
//     .aggregate(pipeline);

//   const docs = await cursor.toArray();
//   var results = docs;
//   //   if (results.length > 0) {
//   //     results.forEach((result, i) => {
//   //       if (result._id == dateTime) {
//   //         res += result.todayrev;
//   //       }
//   //     });
//   //   }
//   console.log(docs);
//   //   return res;
// }

module.exports = {
  listAll,
  findProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  topSellingProducts,
  todaysSells,
};
