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

  @Column({ unique: true }) //autre manière d'écrire le unique plutot que le décorateur @Unique
  email: string;

  @OneToMany(() => NoteEntity, (note) => note.wilder)
  notes: NoteEntity[];
}
