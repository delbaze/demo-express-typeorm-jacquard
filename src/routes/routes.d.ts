export interface ILanguageCreate {
  label: string;
}
export interface ILanguageUpdateData {
  label: string;
}
export interface IFindLanguage {
  id?: string;
}
export interface IDeleteLanguage {
  id?: string;
}

export interface IUpdateLanguage {
  id?: string;
}

export interface IFindNote {
  id?: string;
}
export interface IDeleteNote {
  id?: string;
}

export interface IWilderCreate {
  first_name: string;
  last_name: string;
  email: string;
}
