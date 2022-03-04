import * as React from "react";

const STARTING_AGE = 6570;
const STARTING_DATE = new Date(2018, 1, 1);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
      date: new Date(gameState.date.getTime() + (86400000 * 3))
    })
  };

  const handleWorkButtonPress = () => {
    setMoneyState({
      ...moneyState,
      balance: moneyState.balance + moneyState.activeIncome,
    });

    setGameState({
      ...gameState,
      date: new Date(gameState.date.getTime() + (86400000 * 6))
    })
  };

  return (
    <div>
      <p>Balance: ${moneyState.balance}</p>
      <button onClick={handleWorkButtonPress}>Work Overtime</button>
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
      <p>Current Date: {months[props.currentDate.getMonth()]} {props.currentDate.getFullYear()}</p>
    </div>
  );
};

export default App;
