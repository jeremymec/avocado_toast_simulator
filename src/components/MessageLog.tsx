import * as React from "react";
import * as CSS from 'csstype';

interface MessageLogProps {
  messages: string[];
}
const MessageLog = (props: MessageLogProps) => {

  const messageBoxStyle: CSS.Properties = {
    borderRadius: "1px",
    borderStyle: "solid"
  };

  return (
    <div id="MessageBoxPanel" style={messageBoxStyle}>
      <h2>Message Box</h2>
      {props.messages.map((message, key) => {
          return <p key={key}>{message}</p>
      })}
    </div>
  );
};

export default MessageLog;