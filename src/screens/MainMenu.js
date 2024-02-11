import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch, TextInput, Alert } from 'react-native';
import { DIFFICULTY_LEVELS } from '../utils/constants';
//this is the main menu screen so you're difficulty chosen here, the name the user must put is here, extra lives is here and the leaderboard button is here which brings you to that page.
const MainMenu = ({ navigation }) => {
  const [extraLives, setExtraLives] = useState(false);
  const [userName, setUserName] = useState('');

  const handleStartGame = (difficulty) => {
    if (!userName.trim()) {
      Alert.alert("Name Required", "Please enter a name.");
      return;
    } else {
      Alert.alert("Good Luck!", `Good luck ${userName} in this mine Sweeper game! Feel free to checkout the leaderboard page to see how you've done!`, [
        { text: 'OK', onPress: () => navigation.navigate('GameScreen', { difficulty, extraLives, userName }) }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minesweeper</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
        placeholder="Enter Your Name"
        placeholderTextColor="#888" // Enhanced placeholder visibility
      />
      {Object.keys(DIFFICULTY_LEVELS).map((level) => (
        <View key={level} style={styles.buttonContainer}>
          <Button
            title={`Start ${level.toLowerCase()} game`}
            onPress={() => handleStartGame(level)}
            color="#007bff" // Button color for consistency
          />
        </View>
      ))}
      <View style={styles.livesToggle}>
        <Text>Extra Lives: {extraLives ? 'ON' : 'OFF'}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={extraLives ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setExtraLives}
          value={extraLives}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View Leaderboard"
          onPress={() => navigation.navigate('LeaderboardScreen')}
          color="#007bff" // Button color for consistency
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0f0c0', 
    padding: 20, // Added padding for overall spacing
  },
  title: {
    fontSize: 28, // Increased font size for better visibility
    fontWeight: 'bold',
    color: '#007bff', // Color theme for consistency
    marginBottom: 30, // Increased spacing
  },
  input: {
    height: 50, // Increased height for better touch area
    width: '90%', // Width relative to container size
    backgroundColor: '#fff',
    borderColor: '#007bff', // Border color for consistency
    borderWidth: 2,
    borderRadius: 25, // Rounded corners
    padding: 15, // Padding inside input
    fontSize: 18, // Increased font size for input
    marginBottom: 30, // Increased spacing
  },
  buttonContainer: {
    marginBottom: 15, // Spacing between buttons
    width: '90%', // Width relative to container size
  },
  livesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default MainMenu;
