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
import Promotion from "./components/Promotion";
import { firstJob, Job, unemployed } from "./job";

export interface MoneyState {
  balance: number;
  passiveIncome: number;
  activeIncome: number;
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
    activeIncome: 0,
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
    job: unemployed
  });

  const [gameState, setGameState] = React.useState<GameState>({
    date: Constants.STARTING_DATE,
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
          Constants.MONTHS[gameState.date.getMonth()]
        }'s Expenses.`
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
    setMoneyState({
      ...moneyState,
      balance: moneyState.balance + moneyState.activeIncome,
    });

    setPlayerState({
      ...playerState,
      energy: calculateEnergy(
        playerState.energy,
        -Constants.OVERTIME_ENERGY_COST
      ),
    });
  };

  const handlePromotion = (promotion: Job) => {
    setPlayerState({
      ...playerState,
      job: promotion
    })

    setMoneyState({
      ...moneyState,
      activeIncome: promotion.activeIncome,
      passiveIncome: promotion.passiveIncome,
    })
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
    <div>
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
            {playerState.job.promotion && <Promotion
              avaliablePromotion={playerState.job.promotion!}
              promotionCallback={handlePromotion}
            ></Promotion>}
          </div>
        </div>
        <div className="bg-green-100">
          <Expenses
            bills={moneyState.bills}
            food={moneyState.foodCost}
            rent={moneyState.rent}
          ></Expenses>
        </div>
        <div className="bg-orange-100">
          <PlayerInfo
            name={playerState.name}
            livingSituation={playerState.livingSituation}
            yearsOld={gameState.date.getFullYear() - 2000}
            wellbeing={playerState.wellbeing}
            currentJob={playerState.job}
          />
        </div>
        <div className="col-span-2 row-span-2 bg-pink-100">
          <Shop></Shop>
        </div>
      </div>
    </div>
  );
};

export default App;
