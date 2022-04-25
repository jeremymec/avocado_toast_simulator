import * as React from "react";
import * as CSS from 'csstype';
import { Upgrade } from "../upgrade";

interface WorkButtonProps {
  playerEnergy: number;
  energyRequirment: number;
  workButtonCallback: () => void;
}
const WorkButton = (props: WorkButtonProps) => {

  return (
    <div id="WorkButton">
      <button
        className="w-[350px] h-[350px] bg-yellow-200 text-black font-bold py-2 px-4 rounded-full"
        onClick={props.workButtonCallback}
        disabled={props.playerEnergy <= props.energyRequirment}
      >
          <p className="text-3xl">Work Overtime</p>
      </button>
    </div>
  );
};

export default WorkButton;