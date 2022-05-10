import { LETTER_STATUS_ENUM } from "../constants/keys";
import { EnumTileAnimation } from "../constants/board";

export interface ITile {
  [key: string]: string[];
}

export interface ILetterStatus {
  [key: string]: LETTER_STATUS_ENUM;
}

export interface ITileAnimation {
  [key: string]: EnumTileAnimation;
}
