import * as React from "react";
import * as CSS from 'csstype';
import { months } from "../app";

interface GameInfoProps {
  currentDate: Date;
}
export const GameInfo = (props: GameInfoProps) => {

  const gameInfoPanelStyle: CSS.Properties = {
    borderRadius: "1px",
    borderStyle: "solid"
  };

  return (
    <div id="GameInfoPanel" style={gameInfoPanelStyle}>
      <h2>Game Info</h2>
      <p>Current Date: {months[props.currentDate.getMonth()]} {props.currentDate.getFullYear()}</p>
    </div>
  );
};
