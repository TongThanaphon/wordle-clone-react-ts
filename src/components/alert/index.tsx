import React, { useEffect, useRef } from "react";

import "./styles/index.css";

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { message } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && message) {
      ref.current.classList.add("alert");

      setTimeout(() => {
        ref.current?.classList.add("hide");

        ref.current?.addEventListener("transitionend", () => {
          ref.current?.remove();
        });
      }, 1000);
    }
  }, [message]);

  return <div ref={ref}>{message}</div>;
};

export default Alert;
