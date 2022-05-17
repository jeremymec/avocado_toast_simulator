export interface Job {
  name: string;
  description: string;
  informationDescription: string;
  passiveIncome: number;
  activeIncome: number;
  wellbeingCost: number;
  promotion?: Job;
}

export const thirdJob: Job = {
    name: "Charity Worker",
    description: "You're not sure what good cause you're meant to be promoting, but people are great at dodging ",
    informationDescription: "",
    passiveIncome: 0,
    activeIncome: 20,
    wellbeingCost: 10,
} 

export const secondJob: Job = {
    name: "Delivering Advertisments",
    description: "You have to wake up at 5 am and you're pretty sure it's illegal. But at least you're not paid in vouchers.",
    informationDescription: "",
    passiveIncome: 0,
    activeIncome: 20,
    wellbeingCost: 10,
} 

export const firstJob: Job = {
    name: "Lawn Mowing",
    description: "\"Your aunt pays you to trim the lawn every saturday. The mower is rusty, and half the time you're paid in gift vouchers.\"",
    informationDescription: "mows his family's lawns to make ends meet",
    passiveIncome: 0,
    activeIncome: 10,
    wellbeingCost: 10,
    promotion: secondJob
}

export const unemployed: Job = {
    name: "Unemployed",
    description: "This blows!",
    informationDescription: "is currently between jobs",
    passiveIncome: 0,
    activeIncome: 0,
    wellbeingCost: 0,
    promotion: firstJob
}