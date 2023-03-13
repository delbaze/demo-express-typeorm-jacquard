import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import NoteEntity from "./Note.entity";
@Entity("wilders")
export default class Wilder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => NoteEntity, (note) => note.wilder)
  notes: NoteEntity[];
}

//   relations: {
//     note: {
//       type: "one-to-many",
//       target: "Note",
//       inverseSide: "wilder",
//     },
//   },
// });
