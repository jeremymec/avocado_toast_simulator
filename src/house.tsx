import MoudlyShackImage from "./assets/moudly_shack.png"

export interface House {
    name: string;
    description: string;
    cost: string;
    deposit: string;
    image: any;
  }

export const avaliableHouses: House[] = [
    {
        name: "Moudly Shack",
        description: "A run down shithole! This has to be a lot of text to fit in.",
        cost: "$ 400,000",
        deposit: "$ 10,000",
        image: MoudlyShackImage
    }
]