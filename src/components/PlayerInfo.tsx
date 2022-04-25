import * as React from "react";
import * as CSS from 'csstype';

interface PlayerInfoProps {
  name: string;
  living_situation: string;
  yearsOld: number;
  wellbeing: number;
}
const PlayerInfo = (props: PlayerInfoProps) => {

  return (
    <div id="PlayerInfoPanel">
      <h2>Player Info</h2>
      <p>Name: {props.name}</p>
      <p>Living Situation: {props.living_situation}</p>
      <p>{Math.round(props.yearsOld)} Years Old</p>
      <p>{props.wellbeing} Wellbeing Score ({wellbeingStringFromScore(props.wellbeing)})</p>
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

export default PlayerInfo;