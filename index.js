const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 4000;
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
      .db("inventoryish")
      .collection("inventory");

    app.get("/inventory", async (req, res) => {
      const query = {};
      const cursor = inventoryCollections.find(query);

      const inventory = await cursor.toArray();

      res.send(inventory);
    });

    app.post("/inventory", async (req, res) => {
      const product = req.body;
      const result = await inventoryCollections.insertOne(product);

      res.send({ success: true, result });
    });

    app.get("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const cursor = await inventoryCollections.findOne(query);

      res.send(cursor);
    });

    app.put("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const newDoc = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: newDoc,
      };
      const result = await inventoryCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.delete("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await inventoryCollections.deleteOne(filter);
      res.send({ success: true, result });
    });
  } finally {
  }
};

run().catch(console.dir);

// Root API link GET request
app.get("/", (req, res) => {
  res.send("Hello Inventoryish!");
});

// Listening the app
app.listen(port, () => {
  console.log(`App running in the port: ${port}`);
});
