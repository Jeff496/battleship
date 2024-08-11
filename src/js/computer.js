import { getRandNum } from "./renderShips";
import { gameBoardMarks } from "./gameboard";

function computerAttack(player) {
  let attackMade = false;

  while (!attackMade) {
    const row = getRandNum(10);
    const col = getRandNum(10);

    try {
      player.gameboard.receiveAttack(row, col);
      const grid = document.querySelectorAll(".grid")[0]; // Player's grid
      const cell = grid.children[row * 10 + col];

      if (player.gameboard.board[row][col] === gameBoardMarks.HIT) {
        cell.classList.add("hit");
      } else if (player.gameboard.board[row][col] === gameBoardMarks.MISS) {
        cell.classList.add("miss");
      }

      attackMade = true;
    } catch (error) {
      console.log(error.message);
      console.log("Computer tried to hit an already hit/missed spot.");
    }
  }
}

export { computerAttack };
