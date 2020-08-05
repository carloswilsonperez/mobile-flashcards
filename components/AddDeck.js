import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import React, { Component } from 'react';
import * as Colors from '../utils/colors';
import globalStyles from './globalStyles'

import PropTypes from 'prop-types';
import { addDeck } from '../actions/index';
import { connect } from 'react-redux';
import { saveDeckTitleAS } from '../utils/api';

export class AddDeck extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    addDeck: PropTypes.func.isRequired
  };
  state = {
    text: ''
  };
  handleChange = text => {
    this.setState({ text });
  };
  handleSubmit = () => {
    const { addDeck, navigation } = this.props;
    const { text } = this.state;

    addDeck(text);
    saveDeckTitleAS(text);

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'DeckDetail',
          params: { title: text }
        })
      ]
    });
    navigation.dispatch(resetAction);

    this.setState(() => ({ text: '' }));
  };
  render() {
    let isDisabled = this.state.text.trim() === '';
    return (
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <View style={styles.block}>
            <Text style={styles.title}>Enter the title for the new deck</Text>
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.text}
              onChangeText={this.handleChange}
              placeholder="Deck Name"
              autoFocus={true}
              returnKeyType="done"
              onSubmitEditing={this.handleSubmit}
            />
          </View>
          <TouchableOpacity
            style={isDisabled ? globalStyles.buttonDisabled : globalStyles.button}
            onPress={this.handleSubmit}
            disabled={isDisabled}
          >
            <Text style={globalStyles.buttonText}>Create Deck</Text>
          </TouchableOpacity>
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
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: Colors.gray,
    justifyContent: 'space-between'
  },
  block: {
    marginBottom: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 32
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.textGray,
    backgroundColor: Colors.white,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 50,
    marginBottom: 20
  }
});

export default connect(
  null,
  { addDeck }
)(AddDeck);
