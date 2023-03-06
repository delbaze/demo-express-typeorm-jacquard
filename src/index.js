// const express = require('express') //ES5
import express from "express"; //ES6
import datasource from "./lib/datasource";
import maFonction from "./lib/utilities";
import cors from "cors";
import WilderRoutes from "./routes/wilder.routes"

const app = express();

app.use(express.json()); // middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/wilder", WilderRoutes);
const start = async () => {
  await datasource.initialize();
  app.listen(4000, () => console.log("Serveur démarré sur le port 4000"));
};

start();
