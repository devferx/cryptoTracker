import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import Storage from 'cryptoTracker/src/libs/storage';
import CoinsItem from 'cryptoTracker/src/components/coins/CoinsItem';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from 'cryptoTracker/src/res/colors';

const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
    navigation.addListener('focus', getFavorites);
    return () => {
      navigation.removeListener('focus', getFavorites);
    };
  }, [navigation]);

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      const favs = await Storage.instance.multiGet(keys);
      const favoritesFromStore = favs.map((fav) => JSON.parse(fav[1]));
      setFavorites(favoritesFromStore);
    } catch (error) {
      console.log('get Favorites err', error);
    }
  };

  const handlePress = (coin) => {
    navigation.navigate('CoinDetail', {coin});
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <FavoritesEmptyState />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <CoinsItem
              item={item}
              onPress={() => {
                handlePress(item);
              }}
            />
          )}
        />
      )}
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
