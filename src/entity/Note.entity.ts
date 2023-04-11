import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import LanguageEntity, { LanguageInput } from "./Language.entity";
import WilderEntity, { WilderInput } from "./Wilder.entity";
import { InputType, ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity("note")
export default class Note {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  note: number;

  @Field()
  @ManyToOne(() => LanguageEntity, { eager: true, onDelete: "CASCADE" })
  language: LanguageEntity;

  @Field(() => WilderEntity)
  @ManyToOne(() => WilderEntity, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  wilder: WilderEntity;
}

@InputType()
export class NoteInput implements Partial<Omit<Note, "wilder" | "language">> {
  // @Field()
  // @ManyToOne(() => LanguageInput, { eager: true, onDelete: "CASCADE" })
  // language: LanguageInput;
  @Field()
  id: string;

  @Field()
  note: number;

  @Field(() => WilderInput)
  wilder: WilderInput;

  @Field(() => LanguageInput)
  language: LanguageInput;

  // @Field(() => WilderEntity)
  // @ManyToOne(() => WilderEntity, { eager: true, onDelete: "CASCADE" })
  // @JoinColumn()
  // wilder: WilderInput;
}
