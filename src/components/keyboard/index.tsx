import React, { useEffect, useCallback } from "react";

import "./styles/index.css";

import { UPPER_ROW, MIDDLE_ROW, LOWER_ROW } from "../../utils/constants/keys";
import { ILetterStatus } from "../../utils/interfaces/letter";

interface KeyboardProps {
  lettersStatus?: ILetterStatus;
  onSubmit: () => void;
  onDeleteKey: () => void;
  onPressKey: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = (props) => {
  const { onSubmit, onDeleteKey, onPressKey, lettersStatus } = props;

  const handleClickKey = (key: string) => {
    const value = key.toLowerCase();

    if (value === "enter") {
      onSubmit();

      return;
    } else if (value === "delete") {
      onDeleteKey();

      return;
    } else if (value.match(/^[a-z]$/)) {
      onPressKey(value);

      return;
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const value = event.key;

      if (value === "Enter") {
        onSubmit();

        return;
      } else if (value === "Backspace" || value === "Delete") {
        onDeleteKey();

        return;
      } else if (value.match(/^[a-z]$/)) {
        onPressKey(value);

        return;
      }
    },
    [onSubmit, onDeleteKey, onPressKey]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="keyboard">
      {UPPER_ROW.map((key) => (
        <button
          key={key}
          className={`key ${(lettersStatus && lettersStatus[key]) || "idel"}`}
          onClick={() => handleClickKey(key)}
        >
          {key}
        </button>
      ))}
      <div></div>
      {MIDDLE_ROW.map((key) => (
        <button
          key={key}
          className={`key ${(lettersStatus && lettersStatus[key]) || "idel"}`}
          onClick={() => handleClickKey(key)}
        >
          {key}
        </button>
      ))}
      <div></div>
      <button className="key large" onClick={() => handleClickKey("enter")}>
        Enter
      </button>
      {LOWER_ROW.map((key) => (
        <button
          key={key}
          className={`key ${(lettersStatus && lettersStatus[key]) || "idel"}`}
          onClick={() => handleClickKey(key)}
        >
          {key}
        </button>
      ))}
      <button className="key large" onClick={() => handleClickKey("delete")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            fill="var(--color-tone-1)"
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Keyboard;
