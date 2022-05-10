import React, { useEffect, useState } from "react";

import AppLayout from "./components/layout/AppLayout";
import Keyboard from "./components/keyboard";
import Board from "./components/board";
import AlertContainer from "./components/alert/AlertContainer";

import { COLUMNS, ROWS, EnumTileAnimation } from "./utils/constants/board";
import {
  ITile,
  ILetterStatus,
  ITileAnimation,
} from "./utils/interfaces/letter";
import { LETTER_STATUS_ENUM } from "./utils/constants/keys";

import targetWords from "./utils/data/target-wrods";
import dictionary from "./utils/data/dictionary";

const App = () => {
  const [targetWord, setTargetWord] = useState<string>("");
  const [tiles, setTiles] = useState<ITile>();
  const [tilesStatus, setTilesStatus] = useState<ILetterStatus>();
  const [tilesAnimation, setTilesAnimation] = useState<ITileAnimation>();
  const [lettersStatus, setLettersStatus] = useState<ILetterStatus>();
  const [round, setRound] = useState<number>(0);
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = () => {
    if (round === -1) return;

    const len = tiles?.[round]?.length || 0;

    if (len !== COLUMNS) {
      setMessages((prev) => [...prev, "Not enough letters"]);

      tiles &&
        tiles[round].forEach((_, index) => {
          setTilesAnimation((prev) => ({
            ...prev,
            [`${round}${index}`]: EnumTileAnimation.SHAKE,
          }));
        });

      return;
    }

    const guess = (tiles && tiles[round].join("")) || "";

    if (guess === targetWord) {
      tiles &&
        tiles[round].forEach((letter, index) => {
          setLettersStatus((prev) => ({
            ...prev,
            [letter]: LETTER_STATUS_ENUM.CORRECT,
          }));

          setTilesStatus((prev) => ({
            ...prev,
            [`${round}${index}`]: LETTER_STATUS_ENUM.CORRECT,
          }));
        });

      setMessages((prev) => [...prev, "You Win"]);
      setRound(-1);

      return;
    } else if (!dictionary.includes(guess.toLowerCase())) {
      setMessages((prev) => [...prev, "Not in word list"]);
      return;
    } else {
      tiles &&
        tiles[round].forEach((letter, index) => {
          if (letter === targetWord[index]) {
            setLettersStatus((prev) => ({
              ...prev,
              [letter]: LETTER_STATUS_ENUM.CORRECT,
            }));

            setTilesStatus((prev) => ({
              ...prev,
              [`${round}${index}`]: LETTER_STATUS_ENUM.CORRECT,
            }));
          } else if (targetWord.includes(letter)) {
            setLettersStatus((prev) => ({
              ...prev,
              [letter]: LETTER_STATUS_ENUM.WRONG_LOCATION,
            }));

            setTilesStatus((prev) => ({
              ...prev,
              [`${round}${index}`]: LETTER_STATUS_ENUM.WRONG_LOCATION,
            }));
          } else {
            setLettersStatus((prev) => ({
              ...prev,
              [letter]: LETTER_STATUS_ENUM.WRONG,
            }));

            setTilesStatus((prev) => ({
              ...prev,
              [`${round}${index}`]: LETTER_STATUS_ENUM.WRONG,
            }));
          }
        });
    }

    if (round !== ROWS - 1) {
      setRound((prev) => prev + 1);
    } else {
      setMessages((prev) => [...prev, targetWord]);
      setRound(-1);
    }
  };

  const handleDeleteKey = () => {
    if ((tiles && tiles?.[round]?.length <= 0) || round === -1) return;

    const del = (tiles && tiles[round].slice(0, -1)) || [];

    setTiles((prev) => ({ ...prev, [round]: [...del] }));
  };

  const handlePressKey = (key: string) => {
    if ((tiles && tiles[round]?.length >= COLUMNS) || round === -1) return;

    let add: any;

    if (tiles && tiles[round]) {
      add = { [round]: [...tiles[round], key.toUpperCase()] };
    } else {
      add = { [round]: [key.toUpperCase()] };
    }

    setTiles((prev) => ({ ...prev, ...add }));
  };

  useEffect(() => {
    if (!targetWord) {
      const offsetFromDate = new Date(2022, 0, 1);
      const msOffset = Date.now() - offsetFromDate.getTime();
      const dayOffset = msOffset / 1000 / 60 / 60 / 24;
      const target = targetWords[Math.floor(dayOffset)].toUpperCase();

      setTargetWord(target);
    }
  }, [targetWord]);

  return (
    <AppLayout>
      <AlertContainer messages={messages} />
      <Board
        tiles={tiles}
        tilesStatus={tilesStatus}
        tilesAnimation={tilesAnimation}
      />
      <Keyboard
        lettersStatus={lettersStatus}
        onDeleteKey={handleDeleteKey}
        onSubmit={handleSubmit}
        onPressKey={handlePressKey}
      />
    </AppLayout>
  );
};

export default App;
