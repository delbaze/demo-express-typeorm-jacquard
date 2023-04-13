import * as dotenv from "dotenv";
dotenv.config();
import datasource from "./lib/datasource";
import LanguageResolver from "./resolvers/language.resolver";
import NoteResolver from "./resolvers/note.resolver";
import WilderResolver from "./resolvers/wilder.resolver";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";

const start = async () => {
  await datasource.initialize();
  const schema = await buildSchema({
    resolvers: [WilderResolver, LanguageResolver, NoteResolver],
    validate: false, //désactive partout le class-validator dans type-graphql, vous pouvez l'activer si besoin au cas par cas dans les options des arguments par exemple
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
};

start();
