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
    //relation inverse permettant ensuite d'obtenir les notes du wilder
    notes: {
      type: "one-to-many",
      target: "Note",
      inverseSide: "wilder",
    },
  },
});
