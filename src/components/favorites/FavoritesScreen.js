import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from 'cryptoTracker/src/res/colors';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <FavoritesEmptyState />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    justifyContent: 'center',
    flex: 1,
  },
});
