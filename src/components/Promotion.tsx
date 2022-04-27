import * as React from "react";
import * as CSS from 'csstype';
import { Job } from "../job";

interface PromotionProps {
  avaliablePromotion: Job;
  promotionCallback: (promotion: Job) => void
}
const Promotion = (props: PromotionProps) => {

  return (
    <div id="PromotionPanel">
      <h2>Promotion</h2>
          <p>{props.avaliablePromotion.name}</p>
          <p>{props.avaliablePromotion.description}</p>
          <p>Cost: {props.avaliablePromotion.wellbeingCost} Wellbeing</p>
          <button onClick={() => props.promotionCallback(props.avaliablePromotion)}>Apply</button>
    </div>
  );
};

export default Promotion;