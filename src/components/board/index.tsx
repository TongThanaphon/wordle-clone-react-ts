import React, { useMemo } from "react";

import "./styles/index.css";

import Tile from "./Tile";

import { ROWS, COLUMNS } from "../../utils/constants/board";

const Board = () => {
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
          return <Tile key={`${ri}${ci}`} value="" />;
        });
      })}
    </div>
  );
};

export default Board;
