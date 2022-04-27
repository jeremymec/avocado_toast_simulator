import * as React from "react";
import * as CSS from 'csstype';

interface EnergyProps {
  currentEnergy: number;
}

const Energy = (props: EnergyProps) => {

  return (
    <div>
      <p>Energy: {props.currentEnergy}</p>
    </div>
  );
};

export default Energy;