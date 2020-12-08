import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  SectionList,
  Pressable,
} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import Storage from 'cryptoTracker/src/libs/storage';
import CoinMarketItem from './CoinMarketItem';
import Colors from 'cryptoTracker/src/res/colors';

export default class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  };

  toggleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  };

  addFavorite = () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;

    const stored = Storage.instance.store(key, coin);

    if (stored) {
      this.setState({isFavorite: true});
    }
  };
  removeFavorite = () => {};

  getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/25x25/${coinNameId}.png`;
    }
  };

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    this.setState({markets});
  };

  setCoinFromParams = (coin) => this.setState({coin});

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.setCoinFromParams(coin);
    this.props.navigation.setOptions({title: coin.symbol});
    this.getMarkets(coin.id);
  }

  getSections = (coin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  };

  render() {
    const {coin, markets, isFavorite} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImage}
              source={{uri: this.getSymbolIcon(coin.nameid)}}
            />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>

          <Pressable
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}
            onPress={this.toggleFavorite}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove favorite' : 'Add favorite'}
            </Text>
          </Pressable>
        </View>

        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />

        <Text style={styles.marketTitle}>Markets</Text>
        <FlatList
          style={styles.list}
          horizontal
          data={markets}
          keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
          renderItem={({item}) => <CoinMarketItem item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 8,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});
