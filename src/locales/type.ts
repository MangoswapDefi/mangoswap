
export interface Locales {
  [key: string]: string;
}

export interface Language {
  code: string;
  language: string;
  locale: Locales
}

export interface LanguagesMap {
  zhCN: Language;
  enUS: Language;
}
export type AllLanguages =  Array<Language>