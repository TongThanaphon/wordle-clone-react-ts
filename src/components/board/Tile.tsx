import React, { useMemo } from "react";

import "./styles/tile.css";

interface TileProps {
  value: string;
  type?: "wrong" | "wrong-location" | "correct";
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
