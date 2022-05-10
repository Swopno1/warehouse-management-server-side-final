const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// Initiate Middleware
app.use(cors());
app.use(express.json());

// mongoDB config
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oiekl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();
    const inventoryCollections = client
      .db('inventoryish')
      .collection('inventory');

    app.get('/inventory', async (req, res) => {
      const query = {};
      const cursor = inventoryCollections.find(query);

      const inventory = await cursor.toArray();

      res.send(inventory);
    });
  } finally {
  }
};

run().catch(console.dir);

// Root API link GET request
app.get('/', (req, res) => {
  res.send('Hello Inventoryish!');
});

// Listening the app
app.listen(port, () => {
  console.log(`App running in the port: ${port}`);
});
