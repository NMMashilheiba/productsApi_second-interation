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
    console.log(`List of ${maxNoOfResults} products`);
    console.log(docs);
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
  console.log(typeof parseInt(id));

  if (result) {
    return result;
  } else {
    console.log(`No product with the id ${id}`);
  }
}

module.exports = { listAll, findProductById };
