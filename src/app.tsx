import * as React from "react";
import PlayerInfo from "./components/PlayerInfo";
import Calender from "./components/Calender";
import { game_events, Event } from "./event";
import { upgrades, Upgrade } from "./upgrade";
import * as Constants from "./constants";
import toast, { Toaster } from "react-hot-toast";
import WorkButton from "./components/WorkButton";
import Expenses from "./components/Expenses";
import Money from "./components/Money";
import Shop from "./components/Shop";
import Banner from "./components/Banner";
import Energy from "./components/Energy";
import Promotion from "./components/Job";
import { Job, unemployed } from "./job";
import Background from "./assets/background.png";
import JobPanel from "./components/Job";

export interface MoneyState {
  balance: number;
  passiveIncome: number;
  activeIncome: [number, number];
  rent: number;
  foodCost: number;
  bills: number;
}

export interface PlayerState {
  name: string;
  daysOld: number;
  wellbeing: number;
  energy: number;
  livingSituation: string;
  job: Job;
}

export interface GameState {
  date: Date;
}

export interface WorkState {
  totalWorkCount: number;
  currentJobWorkCount: number;
}

export interface CombinedState {
  moneyState: MoneyState;
  playerState: PlayerState;
  gameState: GameState;
  workState: WorkState;
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

  const [availableUpgrades, setAvailableUpgrades] = React.useState<Upgrade[]>(
    []
  );
  const [upgradePool, setUpgradePool] = React.useState<Upgrade[]>([
    ...upgrades,
  ]);

  const [moneyState, setMoneyState] = React.useState<MoneyState>({
    balance: Constants.STARTING_BALANCE,
    passiveIncome: 0,
    activeIncome: [0, 0],
    rent: Constants.STARTING_RENT,
    foodCost: Constants.STARTING_FOOD_COST,
    bills: Constants.STARTING_BILLS,
  });

  const [playerState, setPlayerState] = React.useState<PlayerState>({
    name: "Bob Ross",
    daysOld: Constants.STARTING_AGE,
    wellbeing: 50,
    energy: 100,
    livingSituation: Constants.STARTING_LIVING_SITUATION,
    job: unemployed,
  });

  const [gameState, setGameState] = React.useState<GameState>({
    date: Constants.STARTING_DATE,
  });

  const [workState, setWorkState] = React.useState<WorkState>({
    totalWorkCount: 0,
    currentJobWorkCount: 0,
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

  const combinedState = (): CombinedState => {
    return {
      moneyState,
      playerState,
      gameState,
      workState,
    };
  };

  const updateState = () => {
    setMoneyState({
      ...moneyState,
      balance: moneyState.balance + moneyState.passiveIncome,
    });

    setPlayerState({
      ...playerState,
      daysOld: playerState.daysOld + 1,
      energy: calculateEnergy(
        playerState.energy,
        0.5 + (3 * playerState.energy) / 100
      ),
    });

    const nextDate = calculateNextDate(gameState.date);

    if (gameState.date.getMonth() !== nextDate.getMonth()) {
      // If the month has changed, apply monthly expenses
      const totalExpenses =
        moneyState.rent + moneyState.bills + moneyState.foodCost;

      toast(
        `You paid your bill of $${totalExpenses} for ${
          Constants.MONTHS_READABLE[gameState.date.getMonth()]
        }'s Expenses.`,
        {
          duration: 5000,
          position: "top-left",
        }
      );

      setMoneyState({
        ...moneyState,
        balance: moneyState.balance - totalExpenses,
      });
    }

    setGameState({
      ...gameState,
      date: nextDate,
    });
  };

  const calculateEnergy = (
    currentEnergy: number,
    modification: number
  ): number => {
    return Math.min(Math.max(currentEnergy + modification, 0), 100);
  };

  const calculateNextDate = (currentDate: Date): Date => {
    return new Date(currentDate.getTime() + Constants.TIME_INCREMENT);
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
        setMessages([...messages, message]);
      }
    }
  };

  const appendAvailableUpgrades = () => {
    const upgrades_to_remove: Upgrade[] = [];

    for (let upgrade of upgradePool) {
      if (
        upgrade.is_available(
          moneyState,
          setMoneyState,
          playerState,
          setPlayerState,
          gameState,
          setGameState
        )
      ) {
        setAvailableUpgrades([...availableUpgrades, upgrade]);
        upgrades_to_remove.push(upgrade);
      }
    }

    setUpgradePool(
      upgradePool.filter((upgrade) => !upgrades_to_remove.includes(upgrade))
    );
  };

  const handleWorkButtonPress = () => {
    const gain =
      moneyState.activeIncome[0] +
      Math.round(Math.random() * (moneyState.activeIncome[1] - moneyState.activeIncome[0]));

    setMoneyState({
      ...moneyState,
      balance: moneyState.balance + gain,
    });

    setPlayerState({
      ...playerState,
      energy: calculateEnergy(
        playerState.energy,
        -Constants.OVERTIME_ENERGY_COST
      ),
    });

    setWorkState({
      ...workState,
      totalWorkCount: workState.totalWorkCount + 1,
      currentJobWorkCount: workState.currentJobWorkCount + 1,
    });
  };

  const handlePromotion = (promotion: Job) => {
    const response = promotion.apply(combinedState());

    if (response.result) {
      setPlayerState({
        ...playerState,
        job: promotion,
      });

      setMoneyState({
        ...moneyState,
        activeIncome: promotion.activeIncome,
        passiveIncome: promotion.passiveIncome,
      });

      toast(`You've been prompted to ${promotion.name}`);
    } else {
      toast(
        response.message ??
          "You don't appear to be qualified for that position!"
      );
    }
  };

  const handleUpgradePurchase = (upgrade: Upgrade) => {
    executeActions(upgrade.actions);
    setPlayerState({
      ...playerState,
      wellbeing: playerState.wellbeing - upgrade.wellbeing_cost,
    });
    setAvailableUpgrades(
      availableUpgrades.filter((upgrade) => upgrade !== upgrade)
    );
  };

  return (
    <div className="bg-[url(./assets/background.png)]">
      <Banner messages={messages}></Banner>
      <div className="grid grid-cols-3 grid-rows-3">
        <div className="row-span-3">
          <div className="relative flex flex-col items-center space-y-6">
            <Calender currentDate={gameState.date}></Calender>
            <Money
              playerBalance={moneyState.balance}
              passiveIncome={moneyState.passiveIncome}
            ></Money>
            <WorkButton
              energyRequirment={Constants.OVERTIME_ENERGY_COST}
              playerEnergy={playerState.energy}
              reward={moneyState.activeIncome}
              workButtonCallback={handleWorkButtonPress}
            ></WorkButton>
            <Energy currentEnergy={playerState.energy}></Energy>
            <JobPanel
              job={playerState.job}
              avaliablePromotion={playerState.job.promotion!}
              promotionCallback={handlePromotion}
            ></JobPanel>
          </div>
        </div>
        <div className="bg-gray-200 bg-opacity-10 shadow-md">
          <Expenses
            bills={moneyState.bills}
            food={moneyState.foodCost}
            rent={moneyState.rent}
          ></Expenses>
        </div>
        <div className="bg-gray-200 bg-opacity-10">
          <PlayerInfo
            name={playerState.name}
            livingSituation={playerState.livingSituation}
            yearsOld={gameState.date.getFullYear() - 2000}
            wellbeing={playerState.wellbeing}
            currentJob={playerState.job}
          />
        </div>
        <div className="col-span-2 row-span-2 bg-gray-200 bg-opacity-10 shadow-md">
          <Shop avaliableUpgrades={availableUpgrades}></Shop>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default App;
