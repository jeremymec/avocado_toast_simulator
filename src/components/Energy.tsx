import * as React from "react";
import * as CSS from "csstype";

interface EnergyProps {
  currentEnergy: number;
}

const percentageStringFromCurrentEnergy = (energy: number) => {
  return `${energy.toFixed(2).toString()}%`;
};

const Energy = (props: EnergyProps) => {
  return (
    <div className="grid w-[15rem] h-[3rem]">
      <div
        className={"row-start-1 col-start-1 bg-orange-300"}
        style={{
          width: percentageStringFromCurrentEnergy(props.currentEnergy)
        }}
      ></div>
      <div className="row-start-1 col-start-1 text-center outline outline-3 outline-gray-600 rounded-md flex flex-col justify-center">
        <p className="text-xl">Energy: {props.currentEnergy.toFixed(0)}</p>
      </div>
    </div>
  );
};

export default Energy;
