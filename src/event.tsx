import { Action } from "./app";

export interface Event {
  trigger?: "time" | "money" | "wellbeing";
  polarity?: "above" | "below";
  threshold?: number;
  actions: Action[];
}

export const game_events: Event[] = [
  {
    trigger: "time",
    polarity: "above",
    threshold: 0,
    actions: [
      {
        messages: ["Welcome to Avacado Simulator!"],
        effect: () => {},
      },
    ],
  },
  {
    trigger: "money",
    polarity: "above",
    threshold: 100,
    actions: [
      {
        messages: ["Your first band!"],
        effect: () => {},
      },
    ],
  },
];
