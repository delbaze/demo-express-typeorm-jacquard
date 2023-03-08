import { DataSource } from "typeorm";
import WilderEntity from "../entity/Wilder.entity";
import NoteEntity from "../entity/Note.entity";
import LanguageEntity from "../entity/Language.entity";


export default new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [WilderEntity, LanguageEntity, NoteEntity],
  logging: ["query", "error"],
});
