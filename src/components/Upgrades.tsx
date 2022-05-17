import * as React from "react";
import * as CSS from "csstype";
import { House } from "../house";
import { Upgrade } from "../upgrade";

interface UpgradesProps {
  availableUpgrades: Upgrade[];
}

const Upgrades = (props: UpgradesProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      {props.availableUpgrades.map((upgrade, key) => {
        return (
          <div className="flex flex-col justify-center items-center text-center bg-gray-300 bg-opacity-25 px-8 py-8 relative" key={key}>
              <img className="w-[10em] opacity-90" src={upgrade.image} />
            <p className="font-merriweather font-bold text-2xl mt-5">{upgrade.name}</p>
            <p className="font-merriweather mt-2 max-w-[12em]">{upgrade.description}</p>
            <button className="px-3 py-2 font-merriweather font-bold text-xl text-white bg-blue-300 rounded focus:outline-none mt-5">Apply</button>
          </div>
        );
      })}
    </div>
  );
};

export default Upgrades;
