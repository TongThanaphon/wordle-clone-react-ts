import { LETTER_STATUS_ENUM } from "../constants/letter";

export interface ITile {
  [key: string]: string[];
}

export interface ILetterStatus {
  [key: string]: LETTER_STATUS_ENUM;
}
