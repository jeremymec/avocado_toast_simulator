import * as React from "react";
import * as CSS from "csstype";
import Houses from "./Houses";
import { House, avaliableHouses } from "../house";

interface ShopProps {}

const Shop = (props: ShopProps) => {
  const [selected, setSelected] = React.useState<"houses" | "upgrades">(
    "houses"
  );

  const isSelectedTailwind = "!bg-blue-100 border-2 border-gray-300";

  return (
    <div className="flex flex-col h-full">
      <div className="w-full">
        <button
          className={`w-1/2 bg-gray-50 text-center font-merriweather font-bold text-2xl py-1 ${
            selected === "houses" && isSelectedTailwind
          }`}
          onClick={() => {
            setSelected("houses");
          }}
        >
          Houses
        </button>
        <button
          className={`w-1/2 bg-gray-50 text-center font-merriweather font-bold text-2xl py-1 ${
            selected === "upgrades" && isSelectedTailwind
          }`}
          onClick={() => {
            setSelected("upgrades");
          }}
        >
          Upgrades
        </button>
      </div>
      <div className="w-full h-full">
          {selected === "houses" ? (
            <Houses availableHouses={avaliableHouses} />
          ) : (
            <p>Upgrades</p>
          )}
      </div>
    </div>
  );
};

export default Shop;
