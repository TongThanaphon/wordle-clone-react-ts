import React from "react";

import "./styles/index.css";

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { message } = props;

  return <div>{message}</div>;
};

export default Alert;
