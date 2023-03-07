import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Wilder",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    first_name: {
      type: "text",
    },
    last_name: {
      type: "text",
    },
    email: {
      type: "text",
      unique: true,
    },
  },
});
