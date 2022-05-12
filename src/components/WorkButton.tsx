import * as React from "react";
import * as CSS from "csstype";
import { Upgrade } from "../upgrade";
import BriefcaseIcon from "../assets/briefcase.png";

interface WorkButtonProps {
  playerEnergy: number;
  energyRequirment: number;
  reward: number;
  workButtonCallback: () => void;
}
const WorkButton = (props: WorkButtonProps) => {
  return (
    <div>
      <button
        className="w-[20em] h-[20em] bg-[#FFF6C6] text-black font-bold py-2 px-4 rounded-full drop-shadow-md active:shadow-lg active:transform(.95) transform active:scale-95 transition duration-150 ease-in-out"
        onClick={props.workButtonCallback}
        disabled={props.playerEnergy <= props.energyRequirment}
      >
        <div className="flex flex-col items-center justify-center space-y-4 mt-5">
          <img className="w-[150px]" src={BriefcaseIcon}></img>
          <p className="font-gugi text-4xl">+${props.reward}</p>
        </div>
      </button>
    </div>
  );
};

export default WorkButton;
