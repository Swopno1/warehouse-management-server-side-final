const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

// Root API link GET request
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Listening the app
app.listen(port, () => {
  console.log(`App running in the port: ${port}`);
});
