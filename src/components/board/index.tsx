import React, { useMemo } from "react";

import "./styles/index.css";

import Tile from "./Tile";

import { ROWS, COLUMNS } from "../../utils/constants/board";

import {
  ILetterStatus,
  ITile,
  ITileAnimation,
} from "../../utils/interfaces/letter";

interface BoardProps {
  tiles?: ITile;
  tilesStatus?: ILetterStatus;
  tilesAnimation?: ITileAnimation;
}

const Board: React.FC<BoardProps> = (props) => {
  const { tiles, tilesStatus, tilesAnimation } = props;

  const rows = useMemo(() => {
    return Array(ROWS).fill("");
  }, []);

  const columns = useMemo(() => {
    return Array(COLUMNS).fill("");
  }, []);

  return (
    <div className="board">
      {rows.map((row, ri) => {
        return columns.map((column, ci) => {
          const letter = (tiles && tiles[ri]?.[ci]) || "";
          const type = (tilesStatus && tilesStatus[`${ri}${ci}`]) || undefined;
          const animation =
            (tilesAnimation && tilesAnimation[`${ri}${ci}`]) || undefined;

          return (
            <Tile
              key={`${ri}${ci}`}
              value={letter}
              type={type}
              animation={animation}
              isActive={!!letter}
            />
          );
        });
      })}
    </div>
  );
};

export default Board;
