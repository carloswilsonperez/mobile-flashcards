import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import * as Colors from '../utils/colors';

import Deck from './Deck';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeDeck } from '../actions/index';
import { removeDeckAS } from '../utils/api';
import globalStyles from './globalStyles'

export class DeckDetail extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    removeDeck: PropTypes.func.isRequired,
    deck: PropTypes.object
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  handleDelete = id => {
    const { removeDeck, navigation } = this.props;

    removeDeck(id);
    removeDeckAS(id);

    navigation.goBack();
  };
  render() {
    const { deck } = this.props;

    return (
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <Deck id={deck.title} />
          <View style={styles.controls}>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() =>
                this.props.navigation.navigate('AddCard', { title: deck.title })
              }>
              <Text style={globalStyles.buttonText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() =>
                this.props.navigation.navigate('Quiz', { title: deck.title })
              }
              >
              <Text style={globalStyles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => this.handleDelete(deck.title)}
              >
              <Text style={globalStyles.buttonText}>Delete Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: Colors.gray
  }
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');
  const deck = state[title];

  return {
    deck
  };
};

export default connect(
  mapStateToProps,
  { removeDeck }
)(DeckDetail);
