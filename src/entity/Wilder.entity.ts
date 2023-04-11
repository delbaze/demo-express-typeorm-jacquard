import NoteEntity, { NoteInput } from "./Note.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import { Length } from "class-validator";

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

  @Field()
  @Column({ nullable: true })
  avatar?: string;

  @Field(() => [NoteEntity], { nullable: true })
  @OneToMany(() => NoteEntity, (note) => note.wilder)
  notes?: NoteEntity[];
}

@ObjectType()
export class MessageWithSuccess {
  @Field({})
  success: boolean;

  @Field()
  message: string;
}

@InputType()
export class WilderInput {
// export class WilderInput implements Partial<Omit<Wilder, "notes">> {
  @Field({nullable: true})
  id: string;

  // @Length(2, 20)
  @Field({nullable: true})
  first_name: string;

  @Field({nullable: true})
  last_name: string;

  @Field({nullable: true})
  email: string;

  @Field(() => [NoteInput], {defaultValue: []})
  notes: NoteInput[];
}
