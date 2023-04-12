import { Field, InputType, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Language, { LanguageInput } from "./Language.entity";
import Wilder from "./Wilder.entity";

@ObjectType()
@Entity("note")
export default class Note {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  note: number;

  @Field(() => Language)
  @ManyToOne(() => Language, { eager: true, onDelete: "CASCADE" })
  language: Language;

  @Field(() => Wilder)
  @ManyToOne(() => Wilder, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  wilder: Wilder;
}

@InputType()
export class NoteInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  note: number;

  @Field()
  language: LanguageInput;
}
