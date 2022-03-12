import { Action } from "./app";
import { MoneyState, PlayerState, GameState } from "./app";

export interface Upgrade {
  name: string;
  description: string;
  wellbeing_cost: number;
  actions: Action[];
  is_available: (moneyState: MoneyState,
    setMoneyState: React.Dispatch<React.SetStateAction<MoneyState>>,
    playerState: PlayerState,
    setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>,
    gameState: GameState,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>) => boolean
}

export const upgrades: Upgrade[] = [
  {
    name: "Job: Office Clerk",
    description: "+$50 Passive Income\n",
    wellbeing_cost: 5,
    actions: [
      {
        messages: ["Congratulations! You got your first job at Generic Co."],
        effect: (m, setM, p, setP, g, setG) => {
          setM({
            ...m,
            passiveIncome: m.passiveIncome + 50,
          });
        },
      },
    ],
    is_available: () => true
  },
];
