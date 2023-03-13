import LanguageEntity from "../entity/Language.entity";
export interface ILanguageUpdateKey extends LanguageEntity {
  [key: string]: string; //permet d'utiliser une chaine de caractère en tant que clé dans le parcours de l'objet
}

export interface IMessageWithSuccess {
  success: boolean;
  message: string;
}
