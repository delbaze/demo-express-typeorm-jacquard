import { EntitySchema } from "typeorm";
export default new EntitySchema({
  name: "Wilder",
  tableName: "wilders",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    first_name: {
      type: "text",
    },
    last_name: { type: "text" },
    age: { type: "int" },
  },
  relations: {
    score: {
      type: "one-to-many",
      target: "Score",
      inverseSide: "wilder",
    },
    language: {
      type: "many-to-many",
      target: "Language",
      joinTable: {
        name: "Wilder_Has_Languages"
      }
    }
  },
});
