export const DIFFICULTY_LEVELS = {
  //these are all the constants to the game so I can call based off the difficulty chosen.
  EASY: {
    ROWS: 8,
    COLS: 8,
    MINES: 10,
    LIVES: 1,
    SCORE_MULTIPLIER: 1,
  },
  MEDIUM: {
    ROWS: 10,
    COLS: 10,
    MINES: 40,
    LIVES: 1,
    SCORE_MULTIPLIER: 2,
  },
  HARD: {
    ROWS: 12,
    COLS: 12,
    MINES: 99,
    LIVES: 1,
    SCORE_MULTIPLIER: 3,
  }
};

export const GAME_STATES = {
  READY: 'ready',
  IN_PROGRESS: 'inProgress',
  WON: 'won',
  LOST: 'lost'
};

export const CELL_STATES = {
  CLOSED: 'closed',
  OPEN: 'open',
};

export const CELL_COLORS = {
  SAFE: 'green',
  MINE: 'red',
  CLOSED: 'grey',
};

