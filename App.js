import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }}>
        Tic-Tac-Toe in Nyra's world!
      </Text>
      <Game />
      <StatusBar style="auto" />
    </View>
  );
}

const ticTacToeGrid = (rows, columns, mapper) => {
  return Array(rows)
    .fill()
    .map(() => Array(columns).fill().map(mapper));
};

const createTicTacToeGrid = () => ticTacToeGrid(3, 3, () => null);

const NEXT_TURN = {
  X: 'O',
  O: 'X',
};

const getInitialState = () => ({
  grid: createTicTacToeGrid(),
  turn: 'X',
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'PRESS':
      const { x, y } = action.payload;
      const { grid, turn } = state;

      if (grid[y][x]) {
        return state;
      }
      const nextState = JSON.parse(JSON.stringify(state));
      nextState.grid[y][x] = turn;
      nextState.turn = NEXT_TURN[turn];
      return nextState;
    default:
      return state;
  }
};

function Game() {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());

  const { grid } = state;

  const handleOnPress = (x, y) => {
    dispatch({ type: 'PRESS', payload: { x, y } });
  };

  return (
    <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
      <View>
        <Text style={{ paddingBottom: 20 }}>Who's turn is it?</Text>
        <Grid grid={grid} handleOnPress={handleOnPress} />
        <View style={{ paddingTop: 20 }}>
          <Button title="Reset"></Button>
        </View>
      </View>
    </View>
  );
}

const setBorders = (tile) => {
  const { x, y } = tile;

  if (x === 0 && y === 0) return { borderTopWidth: 0, borderLeftWidth: 0 };
  if (x === 1 && y === 0) return { borderTopWidth: 0 };
  if (x === 2 && y === 0) return { borderTopWidth: 0, borderRightWidth: 0 };

  if (x === 0 && y === 1) return { borderLeftWidth: 0 };
  if (x === 2 && y === 1) return { borderRightWidth: 0 };

  if (x === 0 && y === 2) return { borderBottomWidth: 0, borderLeftWidth: 0 };
  if (x === 1 && y === 2) return { borderBottomWidth: 0 };
  if (x === 2 && y === 2) return { borderBottomWidth: 0, borderRightWidth: 0 };
};

function Grid({ grid, handleOnPress }) {
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        {grid.map((row, rowIdx) => (
          <View>
            {row.map((value, colIdx) => {
              const borders = setBorders({ x: rowIdx, y: colIdx });
              return (
                <View style={[styles.tile, borders]}>
                  <Cell
                    key={`${colIdx}-${rowIdx}`}
                    value={value}
                    onPress={() => {
                      handleOnPress(colIdx, rowIdx);
                    }}
                  />
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

function Cell({ value, onPress }) {
  return (
    <View
      style={{
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPress}
      >
        <Text
          style={[
            value === 'X' && { color: 'red' },
            {
              fontSize: 24,
              fontWeight: 'bold',
            },
          ]}
        >
          {value}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
  tile: {
    height: 100,
    width: 100,
    borderWidth: 2,
  },
});
