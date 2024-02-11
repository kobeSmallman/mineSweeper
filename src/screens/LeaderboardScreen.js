import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//show the results, the name the user put, the scores, the time they got that score and the difficulty level they did it on.
const LeaderboardScreen = ({ navigation }) => {
    const [scores, setScores] = useState([]);

    const loadScores = async () => {
        try {
            const scoresString = await AsyncStorage.getItem('gameResults');
            const scoresArray = scoresString ? JSON.parse(scoresString) : [];
            scoresArray.sort((a, b) => b.score - a.score);
            setScores(scoresArray);
        } catch (e) {
            console.error('Failed to load scores', e);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadScores);
        loadScores();
        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{item.userName}</Text>
            <Text style={styles.score}>{item.score}</Text>
            <Text style={styles.difficulty}>{item.difficulty}</Text>
            <Text style={styles.gameTime}>{item.gameTime}s</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Leaderboard</Text>
            <FlatList
                data={scores}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Name</Text>
                        <Text style={styles.tableHeaderText}>Score</Text>
                        <Text style={styles.tableHeaderText}>Difficulty</Text>
                        <Text style={styles.tableHeaderText}>Time</Text>
                    </View>
                )}
            />
            <Button title="Back to Menu" onPress={() => navigation.goBack()} color="#007bff" />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#d0f0c0', 
  },
  header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#007bff',
      textAlign: 'center',
      padding: 10,
  },
  item: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      backgroundColor: 'white',
  },
  name: {
      fontSize: 18,
      color: 'black',
      flex: 1.5,
      textAlign: 'left',
  },
  score: {
      fontSize: 18,
      color: 'black',
      flex: 1,
      textAlign: 'left',
  },
  difficulty: {
      fontSize: 18,
      color: 'black',
      flex: 1,
      textAlign: 'left',
  },
  gameTime: {
      fontSize: 18,
      color: 'black',
      flex: 0.75,
      textAlign: 'left',
  },
  tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#007bff',
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  },
  tableHeaderText: {
      fontSize: 18,
      color: 'white',
      flex: 1,
      textAlign: 'center',
      padding: 10,
  },
});

export default LeaderboardScreen;
