import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express"; //ES6
import datasource from "./lib/datasource";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import wilderRoutes from "./routes/wilder.routes";
import languageRoutes from "./routes/language.routes";
import noteRoutes from "./routes/note.routes";
import cors from "cors";
import path from "node:path";

import { buildSchema } from "type-graphql";
import "reflect-metadata";
;
import WilderResolver from "./resolvers/wilder.resolver";
import LanguageResolver from "./resolvers/language.resolver";
const app: Express = express();
const port = process.env.PORT || 4001; //si process.env.PORT est undefined ou null je mets 4001 par défaut

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/avatars", express.static(path.join(__dirname, "../public/avatars")));

app.use("/wilder", wilderRoutes);
app.use("/language", languageRoutes);
app.use("/note", noteRoutes);

const start = async () => {
  await datasource.initialize();
  const schema = await buildSchema({
    resolvers: [ WilderResolver, LanguageResolver],
    validate: false //désactive partout le class-validator dans type-graphql, vous pouvez l'activer si besoin au cas par cas dans les options des arguments par exemple
  });
  
  const server = new ApolloServer({
    schema,
    // typeDefs,
    // resolvers,
  });

  app.listen(port, () => console.log(`Serveur démarré sur le port => ${port}`));

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
 