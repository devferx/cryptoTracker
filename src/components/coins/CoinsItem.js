import React from 'react';
import {StyleSheet, Text, Image, View, Pressable, Platform} from 'react-native';
import Colors from 'cryptoTracker/src/res/colors';

const CoinsItem = ({item, onPress}) => {
  const getImgArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('cryptoTracker/src/assets/arrow_up.png');
    } else {
      return require('cryptoTracker/src/assets/arrow_down.png');
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.name}</Text>
        <Text style={styles.nameText}>{item.symbol}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.imageIcon} source={getImgArrow()} />
      </View>
    </Pressable>
  );
};

export default CoinsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: Platform.OS === 'ios' ? 0 : 16,
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#FFF',
    fontSize: 14,
    marginRight: 12,
  },
  priceText: {
    color: '#FFF',
    fontSize: 14,
  },
  percentText: {
    color: '#FFF',
    fontSize: 12,
    marginRight: 8,
  },
  imageIcon: {
    width: 22,
    height: 22,
  },
});
