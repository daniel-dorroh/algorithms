import { throwIfNotArray } from '../utility/arg-checking';

// Write an algorithm such that if
// an element in an MxN matrix is 0,
// its entire row and column are set to 0;

// Note: I went a bit crazy with the
// solution for this one. The prompt
// reminded me of the old bomberman
// games, so I decided to solve it as
// though it were a game. Rather than
// the bombs ticking down and going off,
// the bombs go off if they're visited
// or if an explosion reaches them.
// You can enable the visualization by
// passing true to the constructor of
// the MapController.

class MapController {

  constructor(map, logToConsole = false) {
    this.map_ = map;
    this.length_ = map.length;
    this.width_ = map[0].length;
    this.burntTiles_ = [];
    this.explosionVectors_ = [];
    this.logToConsole_ = logToConsole;
    this.lastCheckedTile_ = [0, 0];
  }

  processTile(i, j) {
    if (this.logToConsole_) {
      this.lastCheckedTile_ = [i, j];
    }
    if (this.isTileBurnt_(i, j)) {
      return;
    }
    if (!this.isTileBomb_(i, j)) {
      return;
    }
    this.burnTile_(i, j);
  }

  processExplosions() {
    const finishedExplosions = [];
    for (const explosion of [...this.explosionVectors_]) {
      if (explosion.done(explosion.next)) {
        finishedExplosions.push(explosion);
        continue;
      }
      const [nextI, nextJ] = explosion.next;
      this.burnTile_(nextI, nextJ);
      explosion.next = explosion.step(explosion.next);
    }
    for (const explosion of finishedExplosions) {
      this.explosionVectors_.splice(this.explosionVectors_.indexOf(explosion), 1);
    }
    if (this.logToConsole_) {
      this.printMap_();
    }
  }

  finish() {
    while (this.explosionVectors_.length > 0) {
      this.processExplosions();
    }
  }

  isTileBomb_(i, j) {
    return this.map_[i][j] === 0;
  }

  isTileBurnt_(i, j) {
    return this.burntTiles_[i] !== undefined
        && this.burntTiles_[i][j] === true;
  }

  burnTile_(i, j) {
    if (this.isTileBurnt_(i, j)) {
      return;
    }
    if (this.burntTiles_[i] === undefined) {
      this.burntTiles_[i] = [];
    }
    this.burntTiles_[i][j] = true;
    if (this.isTileBomb_(i, j)) {
      this.startExplosion_(i, j);
    }
    this.map_[i][j] = 0;
    return;
  }

  startExplosion_(originI, originJ) {
    if (originI - 1 >= 0 && !this.isTileBurnt_(originI - 1, originJ)) {
      this.explosionVectors_.push({
        next: [originI - 1, originJ],
        done: ([i, j]) => i < 0,
        step: ([i, j]) => [--i, j]
      });
    }
    if (originI + 1 < this.length_ && !this.isTileBurnt_(originI + 1, originJ)) {
      this.explosionVectors_.push({
        next: [originI + 1, originJ],
        done: ([i, j]) => i >= this.length_,
        step: ([i, j]) => [++i, j]
      });
    }
    if (originJ - 1 >= 0 && !this.isTileBurnt_(originI, originJ - 1)) {
      this.explosionVectors_.push({
        next: [originI, originJ - 1],
        done: ([i, j]) => j < 0,
        step: ([i, j]) => [i, --j]
      });
    }
    if (originJ + 1 < this.width_ && !this.isTileBurnt_(originI, originJ + 1)) {
      this.explosionVectors_.push({
        next: [originI, originJ + 1],
        done: ([i, j]) => j >= this.width_,
        step: ([i, j]) => [i, ++j]
      });
    }
  }

  printMap_() {
    const printRows = [];
    for (let i = 0; i < this.length_; i++) {
      const row = [...this.map_[i]];
      const friedRow = this.burntTiles_[i];
      row = friedRow === undefined
          ? row.map(c => c === 0 ? 'BOMB' : c)
          : row.map((c, rI) => c !== 0
              ? c
              : friedRow[rI]
                  ? 'EXPLOSION'
                  : 'BOMB');
      if (this.lastCheckedTile_[0] === i) {
        let currentTile = row[this.lastCheckedTile_[1]];
        if (currentTile !== 'BOMB' && currentTile !== 'EXPLOSION') {
          row[this.lastCheckedTile_[1]] = '✓';
        }
      }
      printRows.push(row.join('  '));
    }
    console.log(printRows.join('\n')
        .replace(/ ?EXPLOSION/g, '💥')
        .replace(/ ?BOMB/g, '💣'));
  }

}

export const bombermanTheMap = (input) => {
  throwIfNotArray(input);
  const length = input.length;
  if (length === 0) {
    return input;
  }
  const width = input[0].length;
  if (width === 0) {
    return input;
  }
  const controller = new MapController(input, /*, true*/);
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < width; j++) {
      controller.processTile(i, j);
      controller.processExplosions();
    }
  }
  controller.finish();
  return input;
};
