import React, {Component} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import Colors from 'cryptoTracker/src/res/colors';

import CoinsItem from './CoinsItem';

class CoinsScreen extends Component {
  state = {
    coins: [],
    loading: false,
  };

  componentDidMount = async () => {
    this.setState({loading: true});

    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    this.setState({coins: res.data, loading: false});
  };

  handlePress = () => {
    console.log('go to detail', this.props);

    this.props.navigation.navigate('CoinDetail');
  };

  render() {
    const {coins, loading} = this.state;

    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator style={styles.loader} color="#FFF" size="large" />
        ) : null}
        <FlatList
          data={coins}
          renderItem={({item}) => <CoinsItem item={item} />}
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
  title: {
    color: '#FFF',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
  },
  loader: {marginTop: 60},
});

export default CoinsScreen;
