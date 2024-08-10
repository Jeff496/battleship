const { Gameboard } = require("./gameboard");

const playerType = {
  REAL: "real",
  COMPUTER: "computer",
};

class Player {
  constructor(playerType) {
    this.gameboard = new Gameboard();
    this.playerType = playerType;
  }
}

module.exports = {
  playerType,
  Player,
};
