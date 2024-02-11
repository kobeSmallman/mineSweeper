import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
//just the hint button, I made this and the instructions button separate 
const Hint = ({ onHintPress }) => {
  return (
    <TouchableOpacity style={styles.hintButton} onPress={onHintPress}>
      <Text style={styles.hintText}>Use Hint</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hintButton: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  hintText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Hint;
