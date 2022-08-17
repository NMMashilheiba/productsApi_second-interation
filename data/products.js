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
    // console.log(`List of ${maxNoOfResults} products`);
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
  return sequenceDocument.sequence_value;
}

async function createProduct(client, product) {
  await getNextSequenceValue(client, "productid");
  //   console.log(typeof product);
  const id = await client
    .db("nodeapi")
    .collection("counters")
    .findOne({ _id: "productid" });
  const newProduct = await client
    .db("nodeapi")
    .collection("productsSells")
    .insertOne({
      _id: id.sequence_value,
      productName: product.productName,
    });
  const result = {
    _id: newProduct.insertedId,
    productName: product.productName,
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
  };
  //   console.log(
  //     `${updatedProduct.matchedCount} documents matched the query criteria`
  //   );
  //   console.log(`${updatedProduct.modifiedCount} documents was/were updated`);

  return resultData;
}

module.exports = { listAll, findProductById, createProduct, updateProductById };
