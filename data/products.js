async function listAll(
  client,
  { maxNoOfResults = Number.MAX_SAFE_INTEGER } = {}
) {
  var res = [];
  const cursor = client
    .db("nodeapi")
    .collection("productSalesRecord")
    .find({})
    .limit(maxNoOfResults);

  const results = await cursor.toArray();
  var docs = results;

  if (results.length > 0) {
    console.log(`List of ${maxNoOfResults} products`);
    console.log(docs);
    return docs;
    // results.forEach((result, i) => {
    //   console.log();
    //   console.log(`${i + 1}. name: ${result.name}`);
    //   console.log(` _id: ${result._id}`);
    //   console.log(` quantity: ${result.quantity}`);
    //   console.log(` amount: ${result.amount}`);
    // });
  } else {
    console.log(`No listing found `);
  }
}

module.exports = { listAll };
