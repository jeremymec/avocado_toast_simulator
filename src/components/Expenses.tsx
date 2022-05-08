import * as React from "react";
import * as CSS from "csstype";

interface ExpensesProps {
  rent: number;
  food: number;
  bills: number;
}

const Expenses = (props: ExpensesProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-7">
      <p className="text-3xl font-merriweather font-bold mt-2">Monthly Expenses</p>
      <div className="grid grid-cols-2 text-left gap-x-52">
        <p className="text-xl font-merriweather font-bold">Rent:</p>
        <p className="text-2xl font-gugi">${props.rent}</p>
        <p className="text-xl font-merriweather font-bold">Food:</p>
        <p className="text-2xl font-gugi">${props.food}</p>
        <p className="text-xl font-merriweather font-bold">Bills:</p>
        <p className="text-2xl font-gugi">${props.bills}</p>
        <p className="text-xl font-merriweather font-bold mt-10">Total: </p>
        <p className="text-2xl font-gugi mt-10">${props.rent + props.food + props.bills}</p>
      </div>
    </div>
  );
};

export default Expenses;
