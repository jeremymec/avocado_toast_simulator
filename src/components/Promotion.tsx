import * as React from "react";
import * as CSS from "csstype";
import { Job } from "../job";

interface PromotionProps {
  avaliablePromotion: Job;
  promotionCallback: (promotion: Job) => void;
}
const Promotion = (props: PromotionProps) => {
  return (
    <div className="border-2 border-black w-full box-border flex flex-col text-center items-center gap-y-3">
      <p className="text-2xl font-merriweather italic mt-3">
        Promotion: {props.avaliablePromotion.name}
      </p>
      <hr className="border border-zinc-700 w-8/12"></hr>
      <p className="font-merriweather italic">{props.avaliablePromotion.description}</p>
      <div className="grid grid-cols-2 text-left gap-x-20">
        <p className="text-xl font-merriweather font-bold">Passive Income:</p>
        <p className="text-2xl font-gugi">${props.avaliablePromotion.passiveIncome}</p>
        <p className="text-xl font-merriweather font-bold">Overtime Bonus:</p>
        <p className="text-2xl font-gugi">${props.avaliablePromotion.activeIncome}</p>
        <p className="text-xl font-merriweather font-bold"> Stress Level:</p>
        <p className="text-xl font-merriweather font-bold">Medium</p>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-xl text-white font-merriweather font-bold py-2 px-4 rounded mb-2 w-[8em]" onClick={() => props.promotionCallback(props.avaliablePromotion)}>
        Apply
      </button>
    </div>
  );
};

export default Promotion;
