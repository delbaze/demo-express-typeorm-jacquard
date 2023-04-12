import LanguageEntity from "../entity/Language.entity";
import WilderEntity from "../entity/Wilder.entity";
import NotesEntity from "../entity/Note.entity";

export interface IMessageWithSuccess {
  success: boolean;
  message: string;
}

export interface ILanguageUpdateKey extends LanguageEntity {
  [key: string]: string; //permet d'utiliser une variable "string" en tant que clé d'un objet
}

export interface IWilderUpdateKey extends WilderEntity {
  [key: string]: string | undefined | NotesEntity[]; //permet d'utiliser une variable "string" en tant que clé d'un objet

  // notes?: NotesEntity[]
}

export interface IFindByRelation {
  language: LanguageEntity;
  wilder: WilderEntity;
}

export interface IAssignNote {
  languageId: string;
  wilderId: string;
  note: number;
}

export interface IWilderCreateService {
  first_name: string
  last_name: string
  email: string
  notes: NoteEntity[]
  avatar?: string
}