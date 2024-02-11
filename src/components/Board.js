import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';
//board component renders the grid of cells.
const Board = ({ boardData, onCellPress}) => {
  const renderBoard = () => {
   // Returns a Cell component for each cell in the row
    return boardData.map((rowData, rowIndex) => {
      const cells = rowData.map((cellData, colIndex) => {
        const cellWithCoordinates = { ...cellData, row: rowIndex, col: colIndex };
        return (
          <Cell
            key={`cell-${rowIndex}-${colIndex}`}
            cellData={cellWithCoordinates}
            onCellPress={onCellPress}
          />
        );
      });

      return (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {cells}
        </View>
      );
    });
  };

  return <View style={styles.board}>{renderBoard()}</View>;
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'violet',
    margin: 10,
    padding: 10,

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Board;
