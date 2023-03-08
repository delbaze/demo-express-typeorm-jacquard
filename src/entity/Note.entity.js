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
  relations: {
    language: {
      target: "Language",
      type: "many-to-one",
      eager: true,
      onDelete: "CASCADE",
    },
    wilder: {
      target: "Wilder",
      type: "many-to-one",
      eager: true,
      joinColumn: true,
      inverseSide: "notes", //ce côté inverse se retrouve dans l'entité wilder (relations.notes)
      onDelete: "CASCADE",
    },
  },
});
