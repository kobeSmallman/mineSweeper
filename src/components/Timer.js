import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
//this is my timer
const Timer = ({ isGameActive }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    //if the game is active the timer will start
    if (isGameActive) {
      interval = setInterval(() => {
        //goes up 1 second at a time
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isGameActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isGameActive, seconds]);//timer reset

  const formatTime = () => {
    const getSeconds = `0${(seconds % 60)}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <Text style={styles.timerText}>{formatTime()}</Text>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontSize: 18,
    margin: 10,
    fontWeight: 'bold',
  },
});

export default Timer;
