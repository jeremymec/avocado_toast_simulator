import * as React from "react";
import * as CSS from 'csstype';
import * as Constants from "../constants"


interface GameInfoProps {
  currentDate: Date;
}
const GameInfo = (props: GameInfoProps) => {

  const gameInfoPanelStyle: CSS.Properties = {
    borderRadius: "1px",
    borderStyle: "solid"
  };

  return (
    <div id="GameInfoPanel" style={gameInfoPanelStyle}>
      <h2>Game Info</h2>
      <p>Current Date: {Constants.MONTHS[props.currentDate.getMonth()]} {props.currentDate.getFullYear()}</p>
    </div>
  );
};

export default GameInfo;