import { shipTypes, Ship } from "./ship";
import { orientation } from "./gameboard";

function makeShips(gameboard) {
  const shipDetails = [
    { type: shipTypes.BATTLESHIP, length: 4 },
    { type: shipTypes.CARRIER, length: 5 },
    { type: shipTypes.CRUISER, length: 3 },
    { type: shipTypes.SUBMARINE, length: 3 },
    { type: shipTypes.DESTROYER, length: 2 },
  ];

  for (const ship of shipDetails) {
    let placed = false;

    while (!placed) {
      // Randomly choose orientation
      const shipOrientation =
        getRandNum(2) === 0 ? orientation.HORIZONTAL : orientation.VERTICAL;

      // Randomly choose starting coordinates
      const maxX = shipOrientation ? 10 : 10 - ship.length + 1;
      const maxY = shipOrientation ? 10 - ship.length + 1 : 10;

      const startX = getRandNum(maxX);
      const startY = getRandNum(maxY);

      try {
        gameboard.placeShip(startX, startY, ship.length, shipOrientation);
        placed = true; // Ship placed successfully
      } catch (error) {
        console.log(
          `Failed to place ship of type ${ship.type}: ${error.message}`
        );
      }
    }
  }
}

function renderShips(gameboard) {
  const grid = document.querySelector(".grid");
  const cells = grid.children;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (gameboard.board[i][j] instanceof Ship) {
        cells[i * 10 + j].classList.add("ship");
      }
    }
  }
}

function getRandNum(max) {
  return Math.floor(Math.random() * max);
}

export { makeShips, renderShips, getRandNum };
