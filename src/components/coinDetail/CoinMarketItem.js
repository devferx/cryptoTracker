import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from 'cryptoTracker/src/res/colors';

const CoinMarketItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.priceText}>{item.price_usd}</Text>
    </View>
  );
};

export default CoinMarketItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderColor: Colors.zircon,
    borderWidth: 1,
    padding: 16,
    marginRight: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  priceText: {
    color: '#FFF',
  },
});
