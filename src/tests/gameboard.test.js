const { Gameboard, orientation, gameBoardMarks } = require("../js/gameboard");
const { shipTypes, Ship } = require("../js/ship");

test("gameboard constructor", () => {
  const newBoard = new Gameboard();
  expect(newBoard.board[0][0]).toBe(gameBoardMarks.UNMARKED);
  expect(newBoard.board[4][7]).toBe(gameBoardMarks.UNMARKED);
  expect(newBoard.board[9][9]).toBe(gameBoardMarks.UNMARKED);
});

test("placeShip function", () => {
  const newBoard = new Gameboard();
  newBoard.placeShip(0, 0, shipTypes.CRUISER, orientation.VERTICAL);
  expect(newBoard.board[0][0]).toBeInstanceOf(Ship);
  expect(newBoard.board[0][1]).toBeInstanceOf(Ship);
  expect(newBoard.board[0][2]).toBeInstanceOf(Ship);
  expect(newBoard.board[0][3]).toBe(gameBoardMarks.UNMARKED);

  newBoard.placeShip(4, 4, shipTypes.SUBMARINE, orientation.HORIZONTAL);
  expect(newBoard.board[3][4]).toBe(gameBoardMarks.UNMARKED);
  expect(newBoard.board[4][4]).toBeInstanceOf(Ship);
  expect(newBoard.board[5][4]).toBeInstanceOf(Ship);
  expect(newBoard.board[6][4]).toBeInstanceOf(Ship);
  expect(newBoard.board[7][4]).toBe(gameBoardMarks.UNMARKED);
});

test("placeShip out of bounds error", () => {
  const newBoard = new Gameboard();
  expect(() => {
    newBoard.placeShip(13, 32, shipTypes.CRUISER, orientation.VERTICAL);
  }).toThrow(/Out of bounds/);
  expect(() => {
    newBoard.placeShip(10, 9, shipTypes.CRUISER, orientation.VERTICAL);
  }).toThrow(/Out of bounds/);
  expect(() => {
    newBoard.placeShip(2, 43, shipTypes.CRUISER, orientation.VERTICAL);
  }).toThrow(/Out of bounds/);
});

test("placeShip Cannot place ship error", () => {
  const newBoard = new Gameboard();
  newBoard.placeShip(3, 4, shipTypes.CARRIER, orientation.HORIZONTAL);
  expect(() => {
    newBoard.placeShip(7, 4, shipTypes.DESTROYER, orientation.VERTICAL);
  }).toThrow(/Cannot place ship/);
});

test("receiveAttack hit", () => {
  const newBoard = new Gameboard();
  newBoard.placeShip(5, 5, shipTypes.CRUISER, orientation.VERTICAL);
  newBoard.receiveAttack(5, 7);
  expect(newBoard.board[5][7]).toBe(gameBoardMarks.HIT);
  expect(newBoard.board[5][6].hitCount).toBe(1);
});

test("receiveAttack miss", () => {
  const newBoard = new Gameboard();
  newBoard.placeShip(5, 5, shipTypes.CRUISER, orientation.VERTICAL);
  newBoard.receiveAttack(5, 9);
  expect(newBoard.board[5][9]).toBe(gameBoardMarks.MISS);
});

test("receiveAttack error", () => {
  const newBoard = new Gameboard();
  newBoard.placeShip(5, 5, shipTypes.CRUISER, orientation.VERTICAL);
  newBoard.receiveAttack(5, 9);
  expect(() => {
    newBoard.receiveAttack(5, 9);
  }).toThrow(/Cannot shoot on miss or hit marks/);
});
