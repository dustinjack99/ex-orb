const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 6000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/dist")));

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
