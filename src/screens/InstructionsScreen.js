import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
//instructions for the game 
const InstructionsScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>How to Play</Text>
      <View style={styles.instructionContainer}>
        <Text style={styles.text}>
          Welcome to my Minesweeper game! The objective of the game is to clear the field 
          of all safe cells without detonating any mines.
        </Text>
        <Text style={styles.text}>
          - Tap a cell to reveal what is underneath it. 
          - A cell can contain a mine or it can be clear which is good. 
          - If you reveal a mine you will lose a life. If you Lose all lives and it's game over. 
          - If you reveal a clear cell your score increases. 
          - The more consecutive clear cells you reveal without hitting a mine the more your score will increase per cell.
          - Use the hint button to reveal a random row BUT WAIT! There is a catch. This will cut your score in half! You also may not gain any points on that row, and finally there is NO GUARANTEE it will be the row you want! But it can help you avoid mines.
        </Text>
        <Text style={styles.text}>
          On the main menu you can select the difficulty level for your game. 
          More difficult levels have larger boards with more mines. 
          You can also choose to play with more lives which will affect your scoring.
        </Text>
        <Text style={styles.text}>
          The leaderboard shows the highest scores achieved during the session.
        </Text>
      </View>
      <Button title="Back to Menu" onPress={() => navigation.goBack()} color="#007bff" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#d0f0c0', 
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    marginVertical: 20,
  },
  instructionContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
    lineHeight: 24, // Added for better readability
  },
});

export default InstructionsScreen;
