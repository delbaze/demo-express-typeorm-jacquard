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
  },
  relations: {
    note: {
      type: "one-to-many",
      target: "Note",
      inverseSide: "wilder",
    },
  },
});
