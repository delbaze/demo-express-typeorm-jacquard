import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import LanguageEntity from "./Language.entity";
import WilderEntity from "./Wilder.entity";

@Entity("note")
export default class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  note: number;

  @ManyToOne(() => LanguageEntity, { eager: true, onDelete: "CASCADE" })
  language: LanguageEntity;

  @ManyToOne(() => WilderEntity, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  wilder: WilderEntity;
}
