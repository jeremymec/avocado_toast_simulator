import * as React from "react";
import * as CSS from 'csstype';

interface MoneyProps {
  playerBalance: number;
  passiveIncome: number;
}

const Money = (props: MoneyProps) => {

  return (
    <div className="flex flex-col text-center">
      <p className="font-gugi text-5xl font-thin" style={{
        WebkitTextStroke: ".06rem",
        WebkitTextStrokeColor: "#FFB800",
        paintOrder: "stroke"
      }}>${props.playerBalance}</p>
      <p className="font-gugi font-thin" style={{
        WebkitTextStroke: "0.02rem",
        WebkitTextStrokeColor: "#FFB800",
        paintOrder: "stroke"
      }}>+ ${props.passiveIncome} per second</p>
    </div>
  );
};

export default Money;