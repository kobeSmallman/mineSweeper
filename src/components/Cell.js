import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CELL_STATES, CELL_COLORS } from '../utils/constants';

const Cell = ({ cellData, onCellPress }) => {
  //whether it's a mine, cell change color
  const getCellColor = () => {
    if(cellData.color) {
      return cellData.color;
    }
    switch (cellData.state) {
      case CELL_STATES.OPEN:
        return cellData.isMine ? CELL_COLORS.MINE : CELL_COLORS.SAFE;
      case CELL_STATES.CLOSED:
      default:
        return CELL_COLORS.CLOSED;
    }
  };
//when pressed we retrieve cell data
  const handlePress = () => {
    onCellPress(cellData.row, cellData.col);
  };

  const cellStyle = {
    ...styles.cell,
    backgroundColor: getCellColor(),
  };

  return (
    <TouchableOpacity
      style={cellStyle}
      onPress={handlePress}
    >
      {cellData.state === CELL_STATES.OPEN && !cellData.isMine ? (
        <Text style={styles.cellText}>
          {cellData.adjacentMines > 0 ? cellData.adjacentMines : ''}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 16,
  },
});

export default Cell;
