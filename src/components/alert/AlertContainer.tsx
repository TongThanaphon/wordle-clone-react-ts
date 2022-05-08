import React from "react";

import "./styles/alert-container.css";

import Alert from ".";

interface AlertContainerProps {
  messages: string[];
}

const AlertContainer: React.FC<AlertContainerProps> = (props) => {
  const { messages } = props;

  return (
    <div className="container">
      {messages.length !== 0 &&
        messages.map((message, index) => (
          <Alert key={`${message}-${index}`} message={message} />
        ))}
    </div>
  );
};

export default AlertContainer;
