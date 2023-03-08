// const express = require('express') //ES5
import express from "express"; //ES6
import datasource from "./lib/datasource";
import maFonction from "./lib/utilities";
import wilderRoutes from "./routes/wilder.routes";
import languageRoutes from "./routes/language.routes";
import noteRoutes from "./routes/note.routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/wilder", wilderRoutes);
app.use("/language", languageRoutes);
app.use("/note", noteRoutes);

const start = async () => {
  await datasource.initialize();
  app.listen(4000, () => console.log("Serveur démarré sur le port 4000"));
};

start();
