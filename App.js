import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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

const getInitialState = () => ({
  grid: createTicTacToeGrid(),
});

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

function Game() {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());

  const { grid } = state;

  return (
    <View style={{ alignItems: 'center', flex: 1, paddingTop: 20 }}>
      <View>
        <Text style={{ paddingBottom: 20 }}>Who's turn is it?</Text>
        <Grid grid={grid} />
        <View style={{ paddingTop: 20 }}>
          <Button title="Reset"></Button>
        </View>
      </View>
    </View>
  );
}

function Grid({ grid }) {
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={[styles.tile, { borderTopWidth: 0, borderLeftWidth: 0 }]}
        ></View>
        <View style={[styles.tile, { borderTopWidth: 0 }]}></View>
        <View
          style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}
        ></View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.tile, { borderLeftWidth: 0 }]}></View>
        <View style={styles.tile}></View>
        <View style={[styles.tile, { borderRightWidth: 0 }]}></View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 }]}
        ></View>
        <View style={[styles.tile, { borderBottomWidth: 0 }]}></View>
        <View
          style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}
        ></View>
      </View>
    </View>
  );
}

function Cell({ value }) {
  return <View style={{ width: 50, height: 50 }}></View>;
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
