import { Gameboard } from "./gameboard";

const playerType = {
  HUMAN: "human",
  COMPUTER: "computer",
};

class Player {
  constructor(playerType) {
    this.gameboard = new Gameboard();
    this.playerType = playerType;
    this.ships = [];
  }
}

export { playerType, Player };
