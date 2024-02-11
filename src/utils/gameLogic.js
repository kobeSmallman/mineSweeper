import { DIFFICULTY_LEVELS, CELL_STATES, GAME_STATES, CELL_COLORS } from './constants';
//this is the game logic

export const initializeBoard = (difficulty) => {
  //sets grid based on difficulty level
  const { ROWS, COLS } = DIFFICULTY_LEVELS[difficulty];
  let board = Array.from({ length: ROWS }, () =>
  //placed cells
    Array.from({ length: COLS }, () => ({
      state: CELL_STATES.CLOSED,
      isMine: false,
      adjacentMines: 0,
      color: CELL_COLORS.CLOSED,
    }))
  );
  return board;
};

//now we place mines
export const placeMines = (board, difficulty) => {
  const { MINES } = DIFFICULTY_LEVELS[difficulty];
  let placedMines = 0;
  while (placedMines < MINES) {
    const row = Math.floor(Math.random() * board.length);
    const col = Math.floor(Math.random() * board[0].length);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      placedMines++;
    }
  }
  return board;
};

//when the cell is revealed based on what it is, the points are handled 
export const revealCell = (board, row, col, score, consecutiveSafeReveals, difficulty) => {
  const cell = board[row][col];
  const difficultyMultiplier = DIFFICULTY_LEVELS[difficulty].SCORE_MULTIPLIER;

  if (cell.state === CELL_STATES.OPEN || cell.hinted) {
    return { board, score, consecutiveSafeReveals };
  }

  cell.state = CELL_STATES.OPEN;

  if (cell.isMine) {
    cell.color = CELL_COLORS.MINE;
    return { board, score: Math.floor(score / 2), consecutiveSafeReveals: 0 };
  } else {
    cell.color = CELL_COLORS.SAFE;
    const pointsEarned = Math.pow(2, consecutiveSafeReveals) * difficultyMultiplier;
    return { board, score: score + pointsEarned, consecutiveSafeReveals: consecutiveSafeReveals + 1 };
  }
};

//what happens if user wins: 
export const checkWin = (board) => {
  return board.every(row =>
    row.every(cell => cell.isMine || (cell.state === CELL_STATES.OPEN))
  );
};

export const startNewGame = (difficulty) => {
  let board = initializeBoard(difficulty);
  board = placeMines(board, difficulty);
  return board;
};

//when the hint is used what happens to points and the cells.
export const useHint = (board, score) => {
    const hintRowIndex = Math.floor(Math.random() * board.length);
    const newBoard = board.map((row, index) => {
      if (index === hintRowIndex) {
        return row.map(cell => ({
          ...cell,
          color: cell.state === CELL_STATES.CLOSED ? (cell.isMine ? CELL_COLORS.MINE : CELL_COLORS.SAFE) : cell.color,
          hinted: true, 
        }));
      }
      return row;
    });
  
    score = Math.floor(score / 2); 
    return { board: newBoard, score, hintRowIndex };
};

//game state update
export const updateGameState = (board) => {
  if (checkWin(board)) {
    return GAME_STATES.WON;
  }
 
  return GAME_STATES.IN_PROGRESS;
};
