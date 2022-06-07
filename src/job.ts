import { CombinedState } from "./app";

export interface Job {
  name: string;
  description: string;
  informationDescription: string;
  passiveIncome: number;
  activeIncome: [number, number];
  wellbeingCost: number;
  apply:(state: CombinedState) => ApplicationResponse;
  promotion?: Job;
}

export interface ApplicationResponse {
    result: boolean
    message?: string
}

export const kitchenHand: Job = {
    name: "Kitchen Hand",
    description: "Onions. Chop. Peppers. Chop. Fingers. No Chop.",
    informationDescription: "",
    passiveIncome: 15,
    activeIncome: [35,40],
    wellbeingCost: 10,
    apply: (state) => { return { result: true } }
}

export const dishwasher: Job = {
    name: "Dishwasher",
    description: "You've never seen so many dishes in your life. Your shoes might be perpetually wet but sometimes they let you eat the leftover fries.",
    informationDescription: "",
    passiveIncome: 10,
    activeIncome: [30,35],
    wellbeingCost: 10,
    apply: (state) => { return { result: true } },
    promotion: kitchenHand
}

export const deliveryDriver: Job = {
    name: "Delivery Driver",
    description: "While you're jealous that your prettier co-worker gets all the best tips skipping the creepy comments is a plus.",
    informationDescription: "",
    passiveIncome: 0,
    activeIncome: [0,50],
    wellbeingCost: 10,
    apply: (state) => { return { result: true } },
    promotion: dishwasher
}

export const charityCollector: Job = {
    name: "Charity Collector",
    description: "You're not 100% on the legitimacy of your cause but you're certain that people have become really good at avoiding eye contact.",
    informationDescription: "",
    passiveIncome: 0,
    activeIncome: [25,30],
    wellbeingCost: 10,
    apply: (state) => { return { result: true } },
    promotion: deliveryDriver
} 

export const deliveringAdvertisments: Job = {
    name: "Delivering Advertisments",
    description: "You have to wake up at 5 am and you're pretty sure it's illegal. But at least you're not paid in vouchers.",
    informationDescription: "",
    passiveIncome: 0,
    activeIncome: [20,25],
    wellbeingCost: 10,
    apply: (state) => { return state.workState.currentJobWorkCount > 10 ?
        { result: true } :
        { result: false, message: "You need more experience."} },
    promotion: charityCollector
}

export const mathTutor: Job = {
    name: "Math Tutor",
    description: "Teaching math to kids at your local library. You didn't do so hot in high school yourself, but with a little help from Youtube...",
    informationDescription: "",
    passiveIncome: 0,
    activeIncome: [10,20],
    wellbeingCost: 10,
    apply: (state) => { return { result: true } },
    promotion: deliveringAdvertisments
} 

export const lawnMowing: Job = {
    name: "Lawn Mowing",
    description: "\"Your aunt pays you to trim the lawn every saturday. The mower is rusty, and half the time you're paid in gift vouchers.\"",
    informationDescription: "mows his family's lawns to make ends meet",
    passiveIncome: 0,
    activeIncome: [0,10],
    wellbeingCost: 10,
    apply: (state) => { return { result: true } },
    promotion: mathTutor
}

export const unemployed: Job = {
    name: "Unemployed",
    description: "This blows!",
    informationDescription: "is currently between jobs",
    passiveIncome: 0,
    activeIncome: [0, 0],
    wellbeingCost: 0,
    apply: (state) => { return { result: true } },
    promotion: lawnMowing
}