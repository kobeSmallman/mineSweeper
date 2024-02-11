import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { DIFFICULTY_LEVELS, GAME_STATES, CELL_STATES, CELL_COLORS } from '../utils/constants';
import { startNewGame, revealCell, useHint, updateGameState } from '../utils/gameLogic';
import Board from '../components/Board';
import Timer from '../components/Timer';
import Hint from '../components/HintButton';
import InstructionsButton from '../components/InstructionsButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

//navigation to screen (App.js has the routing stuff)
const GameScreen = ({ route, navigation }) => {
   // Setting up some states to keep track of the game stuff like the board, score, and lives
  const { difficulty, extraLives, userName } = route.params; 
  const [board, setBoard] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATES.READY);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(extraLives ? 3 : 1);
  const [bombsCount, setBombsCount] = useState(DIFFICULTY_LEVELS[difficulty].MINES);
  const [consecutiveSafeReveals, setConsecutiveSafeReveals] = useState(0);
  const [startTime, setStartTime] = useState(null); 
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    initGame();
  }, [difficulty, extraLives]);
//once game is ready, the board is initialized by the constants like difficulty and stuff and it sets the board up with the respective amount of lives based on if the user chose extra lives
  const initGame = () => {
    const newBoard = startNewGame(difficulty);
    setBoard(newBoard);
    setGameState(GAME_STATES.READY);
    setScore(0);
    setLives(extraLives ? 3 : 1);
    setBombsCount(DIFFICULTY_LEVELS[difficulty].MINES);
    setConsecutiveSafeReveals(0);
    setStartTime(Date.now()); 
    setEndTime(null); // Reset end time
  };
  //storing the result of the game, i used async storage (i don't need a database for it) and it works great whatever device you use, you can see the scores for that device in leaderboards
  const storeGameResult = async (gameResult) => {
    try {
      const existingResults = await AsyncStorage.getItem('gameResults');
      const newResults = existingResults ? JSON.parse(existingResults) : [];
      newResults.push(gameResult);
      await AsyncStorage.setItem('gameResults', JSON.stringify(newResults));
    } catch (error) {
    //don't crash the game if anything goes wrong, wasn't sure if I should put a message here 
    }
  };
  //what happens when the cell is pressed, a lot, game state changes, the cell is revealed, points etc...
  const handleCellPress = (row, col) => {
    if (gameState !== GAME_STATES.IN_PROGRESS) {
        setGameState(GAME_STATES.IN_PROGRESS);
        setStartTime(Date.now()); 
    }

    const { board: newBoard, score: newScore, consecutiveSafeReveals: newConsecutiveSafeReveals } = revealCell(board, row, col, score, consecutiveSafeReveals, difficulty);

    setBoard([...newBoard]); 
    setScore(newScore);
    setConsecutiveSafeReveals(newConsecutiveSafeReveals); 

    if (newBoard[row][col].isMine) {
        const newLives = lives - 1;
        setLives(newLives);

        if (newLives <= 0) {
            setEndTime(Date.now()); 
            Alert.alert('Boom!', 'You hit a mine! Game Over', [{ text: 'Try Again', onPress: () => initGame() }]);
            setGameState(GAME_STATES.LOST);
            setConsecutiveSafeReveals(0); 

          
            const gameResult = {
                userName,
                score: newScore,
                difficulty,
                gameTime: ((Date.now() - startTime) / 1000).toFixed(2),
            };

            
            storeGameResult(gameResult);
        } else {
            Alert.alert('Boom!', `You hit a mine! Lives left: ${newLives}`);
            setConsecutiveSafeReveals(0); 
        }
    } else {
        const updatedGameState = updateGameState(newBoard);
        setGameState(updatedGameState);
        if (updatedGameState === GAME_STATES.WON) {
            setEndTime(Date.now()); 

          
            const gameResult = {
                userName, 
                score: newScore,
                difficulty,
                gameTime: ((Date.now() - startTime) / 1000).toFixed(2),
            };

            
            storeGameResult(gameResult);

            setGameState(GAME_STATES.WON);
            Alert.alert('Congratulations!', 'You have cleared the minefield!', [{ text: 'Play Again', onPress: () => initGame() }]);
        }
    }
};
//what happens when you press the hint button:
  const handleHintPress = () => {
    if (gameState !== GAME_STATES.IN_PROGRESS) return;
    const { board: newBoard, score: newScore, hintRowIndex } = useHint(board, score);
    setBoard([...newBoard]); 
    setScore(newScore); 
    Alert.alert('Hint Used', `Row ${hintRowIndex + 1} has been revealed, and your score has been halved! You may NOT gain any points on that row either ;D (look in instructions if you have any questions)`, [{ text: 'OK' }]);
  };
  
//when you press on the instruction button navigate to the intruction screen which has the details
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <InstructionsButton onPress={() => navigation.navigate('InstructionsScreen')} />
        <Text style={styles.title}>Minesweeper</Text>
      </View>
      <Timer isGameActive={gameState === GAME_STATES.IN_PROGRESS} />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Score: {score}</Text>
        <Text style={styles.infoText}>Lives: {lives}</Text>
        <Text style={styles.infoText}>Bombs: {bombsCount}</Text>
      </View>
      <Hint onHintPress={handleHintPress} />
      <Board
        boardData={board}
        onCellPress={handleCellPress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'purple', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    marginTop: 20,
    backgroundColor: '#007bff',
    borderBottomWidth: 2,
    borderBottomColor: '#005ecb',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    margin: 10,
  },
  livesText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F44336',
    margin: 10,
  },
  bombText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    margin: 10,
  },
});

export default GameScreen;