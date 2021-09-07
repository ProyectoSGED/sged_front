require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const port = process.env.PORT || 9000;

//CAMBIAR PUERTO PARA USAR EN SERVIDOR DE PRODUCCION
app.listen(port);
console.log(`app on port ${port}`);
