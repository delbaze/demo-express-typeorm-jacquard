import LanguageEntity from "../entity/Language.entity";

export interface IMessageWithSuccess {
  success: boolean;
  message: string;
}

export interface ILanguageUpdateKey extends LanguageEntity {
  [key: string]: string; //permet d'utiliser une variable "string" en tant que clé d'un objet
}
