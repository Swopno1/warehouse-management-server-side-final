const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

// mongoDB config
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oiekl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Root API link GET request
app.get("/", (req, res) => {
  res.send("Hello Inventoryish!");
});

// Listening the app
app.listen(port, () => {
  console.log(`App running in the port: ${port}`);
});
