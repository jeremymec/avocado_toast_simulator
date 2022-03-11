import { Action } from "./app";

export interface Event {
    trigger?: "time" | "money" | "wellbeing",
    polarity?: "above" | "below",
    threshold?: number,
    actions: Action[]
}

export const game_events: Event[] = [
    {
        trigger: "money",
        polarity: "above",
        threshold: 100,
        actions: [
            {
                message: "Your first band!",
                effect: () => {}
            }
        ]
    }
]