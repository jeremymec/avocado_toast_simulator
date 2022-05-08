export interface Job {
  name: string;
  description: string;
  passiveIncome: number;
  activeIncome: number;
  wellbeingCost: number;
  promotion?: Job;
}

export const secondJob: Job = {
    name: "Second Job",
    description: "Description",
    passiveIncome: 25,
    activeIncome: 10,
    wellbeingCost: 10,
} 

export const firstJob: Job = {
    name: "First Job",
    description: "\"This is a test description. It should be long, like a good description should!\"",
    passiveIncome: 25,
    activeIncome: 5,
    wellbeingCost: 10,
    promotion: secondJob
}

export const unemployed: Job = {
    name: "Unemployed",
    description: "This blows!",
    passiveIncome: 0,
    activeIncome: 0,
    wellbeingCost: 0,
    promotion: firstJob
}