import { IMessageWithSuccess } from "./../services/services.d";
import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Note, { NoteInput } from "./Note.entity";

@ObjectType()
@Entity("wilders")
export default class Wilder {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column({ unique: true }) //autre manière d'écrire le unique plutot que le décorateur @Unique
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field(() => [Note], { nullable: true })
  @OneToMany(() => Note, (note) => note.wilder)
  notes?: Note[];
}

@InputType()
export class WilderInput {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => [NoteInput], { defaultValue: [] })
  notes: Note[];

  //penser à faire les notes
}

@ObjectType()
export class MessageWithSuccess {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

@InputType()
export class UpdateWilder {
  @Field()
  id: string;

  @Field({ nullable: true })
  first_name: string;

  @Field({ nullable: true })
  last_name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => [NoteInput], { defaultValue: [] })
  notes: Note[];
}
