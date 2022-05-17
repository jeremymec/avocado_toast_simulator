import { Action } from "./app";
import { MoneyState, PlayerState, GameState } from "./app";
import AvacadoToast from "./assets/avacado_toast.png";

export interface Upgrade {
  name: string;
  image: any;
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
    name: "Test Upgrade",
    image: AvacadoToast,
    description: "Test description.",
    wellbeing_cost: 10,
    actions: [],
    is_available: () => true
  }
];
