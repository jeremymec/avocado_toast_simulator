import * as React from "react";
import * as CSS from 'csstype';
import DefaultAvatarIcon from "../assets/default_avatar.png";
import { Job } from "../job";


interface PlayerInfoProps {
  name: string;
  currentJob: Job
  livingSituation: string;
  yearsOld: number;
  wellbeing: number;
}

const PlayerInfo = (props: PlayerInfoProps) => {

  return (
    <div className="flex flex-col items-center justify-center gap-y-10">
      <p className="text-3xl font-merriweather font-bold mt-5">Player Information</p>
      <div className="flex mx-10 gap-5">
        <div className="text-center">
          <img className="w-[30em] mb-3"src={DefaultAvatarIcon}></img>
          <p className="font-merriweather text-xs">Pictured,</p>
          <p className="font-merriweather text-xs">{props.name}</p>
        </div>
        <p className="font-merriweather">{props.name}, {props.yearsOld} years old works as a {props.currentJob.name}. He currently rents a {props.livingSituation}. They're a fine example of a freshly graduated student taking some bold first steps in the world!</p>
      </div>
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