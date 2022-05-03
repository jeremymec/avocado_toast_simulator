import * as React from "react";
import * as CSS from "csstype";
import { Job } from "../job";

interface PromotionProps {
  avaliablePromotion: Job;
  promotionCallback: (promotion: Job) => void;
}
const Promotion = (props: PromotionProps) => {
  return (
    <div className="border-2 border-black w-full box-border flex flex-col text-center">
      <p className="font-merriweather italic">
        Promotion: {props.avaliablePromotion.name}
      </p>
      <hr className="w-1/2"></hr>
      <p>{props.avaliablePromotion.name}</p>
      <p>{props.avaliablePromotion.description}</p>
      <p>Cost: {props.avaliablePromotion.wellbeingCost} Wellbeing</p>
      <button onClick={() => props.promotionCallback(props.avaliablePromotion)}>
        Apply
      </button>
    </div>
  );
};

export default Promotion;
