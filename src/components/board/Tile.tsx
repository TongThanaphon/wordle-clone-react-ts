import React, { useEffect, useMemo, useRef } from "react";

import "./styles/tile.css";

import { LETTER_STATUS_ENUM } from "../../utils/constants/keys";
import { EnumTileAnimation } from "../../utils/constants/board";

interface TileProps {
  value: string;
  type?: LETTER_STATUS_ENUM;
  isActive?: boolean;
  animation?: EnumTileAnimation;
}

const Tile: React.FC<TileProps> = (props) => {
  const { value, type, isActive, animation } = props;

  const ref = useRef<HTMLDivElement>(null);

  const classes = useMemo(() => {
    let val = "tile";

    if (type) {
      val += ` ${type}`;
    }

    if (isActive) {
      val += ` active`;
    }

    // if (animation) {
    //   val += ` ${animation}`;
    // }

    return val;
  }, [type, isActive]);

  // useEffect(() => {
  //   if (ref.current && animation) {
  //     ref.current.addEventListener("animationend", () => {
  //       ref.current?.classList.remove(animation);
  //     });
  //   }
  // }, [ref, animation]);

  return (
    <div ref={ref} className={classes}>
      {value}
    </div>
  );
};

export default Tile;
