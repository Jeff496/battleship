import { Ship } from "./ship";

const gameBoardMarks = {
  HIT: "hit",
  MISS: "miss",
  UNMARKED: "unmarked",
};

const orientation = {
  VERTICAL: true,
  HORIZONTAL: false,
};

class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () =>
      Array(10).fill(gameBoardMarks.UNMARKED)
    );
  }

  placeShip(x, y, shipType, orientation) {
    const originalX = x;
    const originalY = y;
    const newShip = new Ship(shipType, 0);

    let canPlace = true;
    for (let i = 0; i < shipType; i++) {
      if (
        this.outOfBounds(x, y) ||
        this.board[x][y] !== gameBoardMarks.UNMARKED
      ) {
        canPlace = false;
        break;
      }
      if (orientation) {
        x++;
      } else {
        y++;
      }
    }
    if (canPlace) {
      x = originalX;
      y = originalY;
      for (let i = 0; i < shipType; i++) {
        this.board[x][y] = newShip;
        if (orientation) {
          x++;
        } else {
          y++;
        }
      }
    } else {
      throw new Error(
        "Cannot place ship: Out of bounds or overlapping with another ship"
      );
    }
    return newShip; // push onto player array of ships
  }

  receiveAttack(x, y) {
    const spot = this.board[x][y];

    if (spot instanceof Ship) {
      this.board[x][y].hit();
      this.board[x][y] = gameBoardMarks.HIT;
    } else if (spot === gameBoardMarks.UNMARKED) {
      this.board[x][y] = gameBoardMarks.MISS;
    } else if (spot === gameBoardMarks.MISS || spot === gameBoardMarks.HIT) {
      throw new Error("Cannot shoot on miss or hit marks");
    }
  }

  // helper functions

  outOfBounds(x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      throw new Error("Out of bounds coordinates");
    }
  }
}

export { Gameboard, orientation, gameBoardMarks };
