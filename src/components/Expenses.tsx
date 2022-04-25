import * as React from "react";
import * as CSS from 'csstype';

interface ExpensesProps {
  rent: number;
  food: number;
  bills: number;
}

const Expenses = (props: ExpensesProps) => {

  return (
    <div>
      <h2>Monthly Expenses</h2>
      <p>Rent: {props.rent}</p>
      <p>Food: {props.food}</p>
      <p>Bills: {props.food}</p>
      <br />
      <p>Total: {props.rent + props.food + props.bills}</p>
    </div>
  );
};

export default Expenses;