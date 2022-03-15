import * as React from "react";
import * as CSS from 'csstype';
import { Upgrade } from "../upgrade";

interface UpgradesProps {
  avaliableUpgrades: Upgrade[];
  upgradeCallback: (upgrade: Upgrade) => void
}
const Upgrades = (props: UpgradesProps) => {

  const upgradesPanelStyle: CSS.Properties = {
    borderRadius: "1px",
    borderStyle: "solid"
  };

  const upgradeBoxStyle: CSS.Properties = {
    borderRadius: "1px",
    borderStyle: "solid"
  }

  return (
    <div id="UpgradesPanel" style={upgradesPanelStyle}>
      <h2>Upgrades</h2>
      {props.avaliableUpgrades.map((upgrade, key) => {
        return <div key={key} style={upgradeBoxStyle}>
          <p>{upgrade.name}</p>
          <p>{upgrade.description}</p>
          <p>Cost: {upgrade.wellbeing_cost} Wellbeing</p>
          <button onClick={() => props.upgradeCallback(upgrade)}>Purchase Upgrade</button>
        </div>
      })}
    </div>
  );
};

export default Upgrades;