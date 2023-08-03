//import and init express
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const util = require("util");
const uuid = require("uuid");

const navRoutes = require("./routes/index.js");
const apiRoutes = require("./routes/api/notes.js");

const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", navRoutes);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
