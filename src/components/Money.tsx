import * as React from "react";
import * as CSS from 'csstype';

interface MoneyProps {
  playerBalance: number;
  passiveIncome: number;
}

const Money = (props: MoneyProps) => {

  const economyInfoPanelStyle: CSS.Properties = {
    borderRadius: "1px",
    borderStyle: "solid"
  };

  return (
    <div id="EconomyInfoPanel" style={economyInfoPanelStyle}>
      <p>${props.playerBalance}</p>
      <p>+ ${props.passiveIncome} per second</p>
    </div>
  );
};

export default Money;