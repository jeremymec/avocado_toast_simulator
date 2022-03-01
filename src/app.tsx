import * as React from "react";

const STARTING_AGE = 6570;
const STARTING_DATE = new Date(2018, 1, 1);

interface MoneyState {
  balance: number;
  passiveIncome: number;
  activeIncome: number;
}

interface PlayerState {
  name: string;
  daysOld: number;
}

interface GameState {
  date: Date
}

const App = () => {
  const [time, setTime] = React.useState(Date.now());

  const [moneyState, setMoneyState] = React.useState({
    balance: 0,
    passiveIncome: 1,
    activeIncome: 1,
  });

  const [playerState, setPlayerState] = React.useState({
    name: "Bob Ross",
    daysOld: STARTING_AGE,
  });

  const [gameState, setGameState] = React.useState({
    date: STARTING_DATE
  });

  // Call update function every second
  React.useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    mainLoop();
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const mainLoop = () => {
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
      date: new Date(gameState.date.getDate() + 86400)
    })
  };

  const handleWorkButtonPress = () => {
    setMoneyState({
      ...moneyState,
      balance: moneyState.balance + moneyState.activeIncome,
    });
  };

  return (
    <div>
      <p>Balance: ${moneyState.balance}</p>
      <button onClick={handleWorkButtonPress}>Work</button>
      <PlayerInfo
        name={playerState.name}
        daysOld={playerState.daysOld}
      />
      <GameInfo currentDate={gameState.date}></GameInfo>
    </div>
  );
};

interface PlayerInfoProps {
  name: string;
  daysOld: number;
}
const PlayerInfo = (props: PlayerInfoProps) => {
  return (
    <div id="PlayerInfoPanel">
      <p>Name: {props.name}</p>
      <p>{Math.round(props.daysOld / 365)} Years Old</p>
    </div>
  );
};

interface GameInfoProps {
  currentDate: Date;
}
const GameInfo = (props: GameInfoProps) => {
  return (
    <div id="GameInfoPanel">
      <p>Current Date: {props.currentDate.toDateString()}</p>
    </div>
  );
};

export default App;
