import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Unique("contrainte_unique", ["label"])
@Entity("languages")
export default class Language {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  label: string;
}

