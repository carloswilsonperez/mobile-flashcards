import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import * as Colors from '../utils/colors';
import { connect } from 'react-redux';

const Deck = props => {
  const { deck } = props;

  if (deck === undefined) {
    return <View style={styles.deckContainer} />;
  }
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View>
          <Text style={styles.deckText}>{deck.title}</Text>
        </View>
        <View>
          <Text style={styles.cardText}>{deck.questions.length} cards</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

Deck.propTypes = {
  deck: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginBottom: 10
  },
  deckText: {
    fontSize: 28
  },
  cardText: {
    fontSize: 18,
    color: Colors.textGray
  }
});

const mapStateToProps = (state, { id }) => {
  const deck = state[id];

  return {
    deck
  };
};

export default connect(mapStateToProps)(Deck);
