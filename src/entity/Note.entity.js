import { EntitySchema } from "typeorm";
export default new EntitySchema({
  name: "Note",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    note: {
      type: "int",
    },
  },
});
