import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Unique("contrainte_unique", ["label"])
@Entity("languages")
export default class Language {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({unique: true})
  @Column()
  label: string;
}
// import { EntitySchema } from "typeorm";
// export default new EntitySchema({
//   name: "Language",
//   tableName: "languages",
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: true,
//     },
//     label: {
//       type: "text",
//       unique: true
//     },
//   },
// });
