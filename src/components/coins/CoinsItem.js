import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CoinsItem = ({item}) => {
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.symbol}</Text>
    </View>
  );
};

export default CoinsItem;

const styles = StyleSheet.create({});