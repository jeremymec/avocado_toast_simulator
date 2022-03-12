import * as React from "react";
import { EconomyInfo } from "./components/EconomyInfo";
import { PlayerInfo } from "./components/PlayerInfo";
import { GameInfo } from "./components/GameInfo";
import { game_events, Event } from "./event";
import { MessageLog } from "./components/MessageLog";
import { Upgrades } from "./components/Upgrades";
import { upgrades, Upgrade } from "./upgrade";

const STARTING_AGE = 6570;
const STARTING_DATE = new Date(2018, 1, 1);
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface MoneyState {
  balance: number;
  passiveIncome: number;
  activeIncome: number;
}

export interface PlayerState {
  name: string;
  daysOld: number;
  wellbeing: number;
}

export interface GameState {
  date: Date;
}

export interface Action {
  messages: string[];
  effect: (
    moneyState: MoneyState,
    setMoneyState: React.Dispatch<React.SetStateAction<MoneyState>>,
    playerState: PlayerState,
    setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>,
    gameState: GameState,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
  ) => void;
}

const App = () => {
  const [time, setTime] = React.useState(Date.now());
  const [gameEvents, setGameEvents] = React.useState(game_events);

  const [availableUpgrades, setAvailableUpgrades] = React.useState<Upgrade[]>([]);
  const [upgradePool, setUpgradePool] = React.useState<Upgrade[]>([...upgrades]);

  const [moneyState, setMoneyState] = React.useState<MoneyState>({
    balance: 0,
    passiveIncome: 2,
    activeIncome: 10,
  });

  const [playerState, setPlayerState] = React.useState<PlayerState>({
    name: "Bob Ross",
    daysOld: STARTING_AGE,
    wellbeing: 50,
  });

  const [gameState, setGameState] = React.useState<GameState>({
    date: STARTING_DATE,
  });

  const [messages, setMessages] = React.useState<string[]>([
    "Welcome to Avocado Toast",
  ]);

  // Call update function every second
  React.useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    updateState();
    processEvents();
    appendAvailableUpgrades();
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const updateState = () => {
    setMoneyState({
      ...moneyState,
      balance: moneyState.balance + moneyState.passiveIncome,
    });

    setPlayerState({
      ...playerState,
      daysOld: playerState.daysOld + 1,
    });

    setGameState({
      ...gameState,
      date: new Date(gameState.date.getTime() + 86400000 * 3),
    });
  };

  const processEvents = () => {
    const triggered_events = [];

    console.log("Game events", gameEvents);

    for (let game_event of gameEvents) {
      console.log("####" + game_event);
      switch (game_event.trigger) {
        case "money":
          if (
            game_event.polarity === "above"
              ? moneyState.balance > game_event.threshold!
              : moneyState.balance < game_event.threshold!
          ) {
            executeActions(game_event.actions);
            triggered_events.push(game_event);
          }
      }
    }

    const updateEvents = (events: Event[]) =>
      gameEvents.filter((event) => {
        return !events.includes(event);
      });

    setGameEvents(updateEvents(triggered_events));
    console.log("Game events updated", gameEvents);
  };

  const executeActions = (actions: Action[]) => {
    for (let action of actions) {
      action.effect(
        moneyState,
        setMoneyState,
        playerState,
        setPlayerState,
        gameState,
        setGameState
      );
      for (let message of action.messages) {
        setMessages([...messages, message])
      }
    }
  };

  const appendAvailableUpgrades = () => {
    const upgrades_to_remove: Upgrade[] = []

    for (let upgrade of upgradePool) {
      if (upgrade.is_available(
        moneyState,
        setMoneyState,
        playerState,
        setPlayerState, 
        gameState,
        setGameState
      )) {
        setAvailableUpgrades([...availableUpgrades, upgrade]);
        upgrades_to_remove.push(upgrade);
      }
    }

    setUpgradePool(upgradePool.filter(upgrade => !upgrades_to_remove.includes(upgrade)));
  }

  const handleWorkButtonPress = () => {
    setMoneyState({
      ...moneyState,
      balance: moneyState.balance + moneyState.activeIncome,
    });

    setGameState({
      ...gameState,
      date: new Date(gameState.date.getTime() + 86400000 * 6),
    });
  };

  const handleUpgradePurchase = (upgrade: Upgrade) => {
    executeActions(upgrade.actions);
    setPlayerState({
      ...playerState,
      wellbeing: playerState.wellbeing - upgrade.wellbeing_cost
    });
    setAvailableUpgrades(availableUpgrades.filter(upgrade => upgrade !== upgrade));
  }

  return (
    <div>
      <EconomyInfo
        playerBalance={moneyState.balance}
        activeIncome={moneyState.activeIncome}
        passiveIncome={moneyState.passiveIncome}
      ></EconomyInfo>
      <PlayerInfo
        name={playerState.name}
        yearsOld={gameState.date.getFullYear() - 2000}
        wellbeing={playerState.wellbeing}
      />
      <GameInfo currentDate={gameState.date}></GameInfo>
      <MessageLog messages={messages}></MessageLog>
      <Upgrades avaliableUpgrades={availableUpgrades} upgradeCallback={handleUpgradePurchase}></Upgrades>
      <button onClick={handleWorkButtonPress}>Work Overtime</button>
    </div>
  );
};

export default App;
