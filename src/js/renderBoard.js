import { gameBoardMarks } from "./gameboard";
import { humanTurn, switchTurn } from "../index.js";

function renderBoard(player) {
  const gridContainer = document.querySelector(".gridContainer");
  const grid = document.createElement("div");
  grid.classList.add(`grid`);

  // cell creation and event listener
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;

      cell.addEventListener("click", () => {
        if (humanTurn) {
          cellClick(player.gameboard, cell.dataset.row, cell.dataset.col, cell);
          switchTurn();
        }
      });

      grid.appendChild(cell);
    }
  }

  gridContainer.appendChild(grid);
}

function cellClick(gameboard, row, col, cell) {
  try {
    gameboard.receiveAttack(row, col);
    if (gameboard.board[row][col] === gameBoardMarks.HIT) {
      cell.classList.add("hit");
    } else if (gameboard.board[row][col] === gameBoardMarks.MISS) {
      cell.classList.add("miss");
    }
  } catch (error) {
    console.log(error.message);
  }
}

export { renderBoard };
