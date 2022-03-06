import * as React from "react";
import { EconomyInfo } from "./components/EconomyInfo";
import { PlayerInfo } from "./components/PlayerInfo";
import { GameInfo } from "./components/GameInfo";
import { game_events, Action, Event } from "./event";
import { MessageLog } from "./components/MessageLog";

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

interface MoneyState {
  balance: number;
  passiveIncome: number;
  activeIncome: number;
}

interface PlayerState {
  name: string;
}

interface GameState {
  date: Date;
}

const App = () => {
  const [time, setTime] = React.useState(Date.now());
  const [gameEvents, setGameEvents] = React.useState(game_events);

  const [moneyState, setMoneyState] = React.useState({
    balance: 0,
    passiveIncome: 2,
    activeIncome: 10,
  });

  const [playerState, setPlayerState] = React.useState({
    name: "Bob Ross",
    daysOld: STARTING_AGE,
  });

  const [gameState, setGameState] = React.useState({
    date: STARTING_DATE,
  });

  const [messages, setMessages] = React.useState([
    "Welcome to Avocado Toast"
  ])

  // Call update function every second
  React.useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    updateState();
    processEvents();
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
    const triggered_events = []

    console.log('Game events', gameEvents);

    for (let game_event of gameEvents) {
      console.log('####' + game_event);
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

    const updateEvents = (events: Event[]) => gameEvents.filter((event) => {
      return !events.includes(event);
    });

    setGameEvents(updateEvents(triggered_events));
    console.log('Game events updated', gameEvents);
  };

  const executeActions = (actions: Action[]) => {
    for (let action of actions) {
      switch (action.target) {
        case "money":
          setMoneyState({
            ...moneyState,
            balance: moneyState.balance + (action.mod ?? 0)
          });
      }
      if (action.message) {
        setMessages([...messages, action.message]);
      }
    }

  };

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
      />
      <GameInfo currentDate={gameState.date}></GameInfo>
      <MessageLog messages={messages}></MessageLog>
      <button onClick={handleWorkButtonPress}>Work Overtime</button>
    </div>
  );
};

export default App;
