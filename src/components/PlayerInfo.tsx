import * as React from "react";
import * as CSS from 'csstype';

interface PlayerInfoProps {
  name: string;
  yearsOld: number;
  wellbeing: number;
  energy: number;
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
      <p>{props.wellbeing} Wellbeing Score ({wellbeingStringFromScore(props.wellbeing)})</p>
      <p>{props.energy} Energy</p>
    </div>
  );
};

const wellbeingStringFromScore = (score: number): string => {
  if (score >= 50) {
    return "Thriving";
  }
  if (score >= 40) {
    return "Content";
  }
  if (score >= 30) {
    return "Mixed";
  }
  if (score >= 20) {
    return "Struggling";
  }
  if (score >= 10) {
    return "Unstable";
  }
  return "Mental Breakdown";
}