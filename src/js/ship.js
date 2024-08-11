const shipTypes = {
  CARRIER: 5,
  BATTLESHIP: 4,
  CRUISER: 3,
  SUBMARINE: 3,
  DESTROYER: 2,
};

class Ship {
  constructor(length, hitCount) {
    this.length = length;
    this.hitCount = hitCount;
    this.sunk = false;
  }
  hit() {
    this.hitCount++;
    this.isSunk();
  }

  isSunk() {
    if (this.length === this.hitCount) {
      this.sunk = true;
    }
  }
}

export { Ship, shipTypes };
