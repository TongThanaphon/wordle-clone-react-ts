import React, { useMemo } from "react";

import "./styles/tile.css";

import { LETTER_STATUS_ENUM } from "../../utils/constants/letter";

interface TileProps {
  value: string;
  type?: LETTER_STATUS_ENUM;
  isActive?: boolean;
}

const Tile: React.FC<TileProps> = (props) => {
  const { value, type, isActive } = props;

  const classes = useMemo(() => {
    let value = "tile";

    if (type) {
      value += ` ${type}`;
    }

    if (isActive) {
      value += ` active`;
    }

    return value;
  }, [type, isActive]);

  return <div className={classes}>{value}</div>;
};

export default Tile;
