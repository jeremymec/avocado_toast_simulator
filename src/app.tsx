import * as React from "react";
import * as CSS from 'csstype';

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
}

interface GameState {
  date: Date
}

const App = () => {
  const [time, setTime] = React.useState(Date.now());

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
      <EconomyInfo playerBalance={moneyState.balance}
        activeIncome={moneyState.activeIncome}
        passiveIncome={moneyState.passiveIncome}></EconomyInfo>
      <PlayerInfo
        name={playerState.name}
        yearsOld={(gameState.date.getFullYear() - 2000)}
      />
      <GameInfo currentDate={gameState.date}></GameInfo>
      <button onClick={handleWorkButtonPress}>Work Overtime</button>
    </div>
  );
};

interface EconomyInfoProps {
  playerBalance: number
  passiveIncome: number,
  activeIncome: number
}
const EconomyInfo = (props: EconomyInfoProps) => {

  const economyInfoPanelStyle: CSS.Properties = {
    borderRadius: "1px",
    borderStyle: "solid"
  }

  return (
    <div id="EconomyInfoPanel" style={economyInfoPanelStyle}>
      <h2>Economy Info</h2>
      <p>Balance: ${props.playerBalance}</p>
      <p>Passive Income: ${props.passiveIncome}</p>
      <p>Active Income: ${props.activeIncome}</p>
    </div>
  );
};


interface PlayerInfoProps {
  name: string;
  yearsOld: number;
}
const PlayerInfo = (props: PlayerInfoProps) => {

  const playerInfoPanelStyle: CSS.Properties = {
    borderRadius: "1px",
    borderStyle: "solid"
  }

  return (
    <div id="PlayerInfoPanel" style={playerInfoPanelStyle}>
      <h2>Player Info</h2>
      <p>Name: {props.name}</p>
      <p>{Math.round(props.yearsOld)} Years Old</p>
    </div>
  );
};

interface GameInfoProps {
  currentDate: Date;
}
const GameInfo = (props: GameInfoProps) => {

  const gameInfoPanelStyle: CSS.Properties = {
    borderRadius: "1px",
    borderStyle: "solid"
  }

  return (
    <div id="GameInfoPanel" style={gameInfoPanelStyle}>
      <h2>Game Info</h2>
      <p>Current Date: {months[props.currentDate.getMonth()]} {props.currentDate.getFullYear()}</p>
    </div>
  );
};

export default App;
