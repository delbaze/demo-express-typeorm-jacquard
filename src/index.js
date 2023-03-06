// const express = require('express') //ES5
import express from "express"; //ES6
import datasource from "./lib/datasource";
import maFonction from "./lib/utilities";

const app = express();

app.get("/", function (req, res) {
  res.json({ message: "Hello Coucou" });
});

// async function start(){
const start = async () => {
  await datasource.initialize();
  app.listen(4000, () => console.log("Serveur démarré sur le port 4000"));
};

start();