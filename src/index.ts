import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express"; //ES6
import datasource from "./lib/datasource";

import wilderRoutes from "./routes/wilder.routes";
import languageRoutes from "./routes/language.routes";
import noteRoutes from "./routes/note.routes";
import cors from "cors";
import path from "node:path";
import "reflect-metadata";

const app: Express = express();
const port = process.env.PORT || 4000; //si process.env.PORT est undefined ou null je mets 4000 par défaut

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/avatars", express.static(path.join(__dirname, "../public/avatars")));

app.use("/wilder", wilderRoutes);
app.use("/language", languageRoutes);
app.use("/note", noteRoutes);

const start = async () => {
  await datasource.initialize();
  app.listen(port, () => console.log(`Serveur démarré sur le port => ${port}`));
};

start();
