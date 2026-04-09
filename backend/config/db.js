const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "process.env.MONGODB_URI";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Connected to MongoDB!");
  return client.db("BanyanHire"); // your actual DB name
}

module.exports = { connectDB, client };