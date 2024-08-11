import { Player, playerType } from "./js/player";
import { renderBoard } from "./js/renderBoard";
import { makeShips, renderShips } from "./js/renderShips";
import { computerAttack } from "./js/computer";
import "./styles.css";

const player = new Player(playerType.HUMAN);
const computer = new Player(playerType.COMPUTER);
let humanTurn = true;

window.addEventListener("DOMContentLoaded", () => {
  renderBoard(player.gameboard); // only input gameboard so cell click doesn't work
  renderBoard(computer);

  makeShips(player.gameboard);
  makeShips(computer.gameboard);
  renderShips(player.gameboard);
});

function switchTurn() {
  humanTurn = !humanTurn;

  if (!humanTurn) {
    setTimeout(() => {
      computerAttack(player);
      humanTurn = !humanTurn;
    }, 500);
  }
}

export { humanTurn, switchTurn };
