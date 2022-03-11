import * as React from "react";
import * as CSS from 'csstype';
import { Upgrade } from "../upgrade";

interface UpgradesProps {
    avaliableUpgrades: Upgrade[]
}
export const Upgrades = (props: UpgradesProps) => {

  const upgradesPanelStyle: CSS.Properties = {
    borderRadius: "1px",
    borderStyle: "solid"
  };

  return (
    <div id="UpgradesPanel" style={upgradesPanelStyle}>
      <h2>Upgrades</h2>
      {props.avaliableUpgrades.map((upgrade, key) => {
        return <p key={key}>{upgrade.name}</p>
      })}
    </div>
  );
};
