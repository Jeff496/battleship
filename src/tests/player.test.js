const { playerType, Player } = require("../js/player");
const { gameBoardMarks } = require("../js/gameboard");

test("player constructor", () => {
  const player = new Player(playerType.REAL);
  expect(player.playerType).toBe(playerType.REAL);
  expect(player.gameboard.board[0][0]).toBe(gameBoardMarks.UNMARKED);
});
