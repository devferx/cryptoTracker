import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class CoinDetailScreen extends Component {
  componentDidMount() {
    console.log('coin', this.props.route.params);
  }

  render() {
    return (
      <View>
        <Text>CoinDetailScreen</Text>
      </View>
    );
  }
}
