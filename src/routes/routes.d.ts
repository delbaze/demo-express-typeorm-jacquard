import NoteEntity from "../entity/Note.entity";

export interface ILanguageCreate {
  label: string;
}
export interface ILanguageUpdateData {
  label: string;
}

export interface IParams {
  [key: string]: string; //l'interface peut avoir n'importe quelle propriété avec une clé de type string, et que la valeur associée à cette propriété doit être une string
}

interface FileInfos {}

export interface IWilderCreate {
  first_name: string;
  last_name: string;
  email: string;
  // notes?: NoteEntity[]
  notes?: string | undefined;
}
export interface IWilderCreateService extends IWilderCreate {
  notes?: NoteEntity[];
  avatar: string | undefined;
}
