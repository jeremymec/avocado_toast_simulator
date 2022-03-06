import * as React from "react";
import * as CSS from 'csstype';

interface PlayerInfoProps {
  name: string;
  yearsOld: number;
}
export const PlayerInfo = (props: PlayerInfoProps) => {

  const playerInfoPanelStyle: CSS.Properties = {
    borderRadius: "1px",
    borderStyle: "solid"
  };

  return (
    <div id="PlayerInfoPanel" style={playerInfoPanelStyle}>
      <h2>Player Info</h2>
      <p>Name: {props.name}</p>
      <p>{Math.round(props.yearsOld)} Years Old</p>
    </div>
  );
};
