import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { InputType, ObjectType, Field } from "type-graphql";

@ObjectType()
@Unique("contrainte_unique", ["label"])
@Entity("languages")
export default class Language {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  label: string;
}

@InputType()
export class LanguageInput {

  @Field()
  id: string;

  @Field()
  label: string;
}
