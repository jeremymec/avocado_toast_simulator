import * as React from "react";
import * as CSS from 'csstype';

interface EconomyInfoProps {
  playerBalance: number;
  passiveIncome: number;
  activeIncome: number;
}

const EconomyInfo = (props: EconomyInfoProps) => {

  const economyInfoPanelStyle: CSS.Properties = {
    borderRadius: "1px",
    borderStyle: "solid"
  };

  return (
    <div id="EconomyInfoPanel" style={economyInfoPanelStyle}>
      <h2>Economy Info</h2>
      <p>Balance: ${props.playerBalance}</p>
      <p>Passive Income: ${props.passiveIncome}</p>
      <p>Overtime Bonus: ${props.activeIncome}</p>
    </div>
  );
};

export default EconomyInfo;