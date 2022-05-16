import * as React from "react";
import * as CSS from "csstype";
import { House } from "../house";

interface HousesProps {
  availableHouses: House[];
}

const Houses = (props: HousesProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      {props.availableHouses.map((house, key) => {
        return (
          <div className="flex flex-col justify-center items-center text-center bg-gray-300 bg-opacity-25 px-5 py-8 relative" key={key}>
              <img className="w-[10em] opacity-90" src={house.image} />
              <p className="font-gugi text-4xl mt-5 bg-red-300 absolute left-0 top-0">{house.cost}</p>
            <p className="font-merriweather font-bold text-2xl mt-5">{house.name}</p>
            <p className="font-merriweather mt-2 max-w-[12em]">{house.description}</p>
            <button className="px-3 py-2 font-merriweather font-bold text-xl text-white bg-blue-300 rounded focus:outline-none mt-5">{house.deposit} Deposit</button>
          </div>
        );
      })}
    </div>
  );
};

export default Houses;
