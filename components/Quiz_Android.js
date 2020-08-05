import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import * as Colors from '../utils/colors';
import globalStyles from './globalStyles'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

const screen = {
  QUESTION: 'question',
  ANSWER: 'answer',
  RESULT: 'result'
};
const answer = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};

export class Quiz_Android extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired
  };

  state = {
    show: screen.QUESTION,
    correct: 0,
    incorrect: 0,
    questionCount: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0)
  };

  handlePageChange = evt => {
    this.setState({
      show: screen.QUESTION
    });
  };

  handleAnswer = (response, page) => {
    if (response === answer.CORRECT) {
      this.setState(prevState => ({ correct: prevState.correct + 1 }));
    } else {
      this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }));
    }
    this.setState(
      prevState => ({
        answered: prevState.answered.map((val, index) => (page === index ? 1 : val))
      }),
      () => {
        const { correct, incorrect, questionCount } = this.state;

        if (questionCount === correct + incorrect) {
          this.setState({ show: screen.RESULT });
        } else {
          this.viewPager.setPage(page + 1);
          this.setState(prevState => ({
            show: screen.QUESTION
          }));
        }
      }
    );
  };

  handleReset = () => {
    this.setState(prevState => ({
      show: screen.QUESTION,
      correct: 0,
      incorrect: 0,
      answered: Array(prevState.questionCount).fill(0)
    }));
  };

  render() {
    const { questions } = this.props.deck;
    const { show } = this.state;

    if (questions.length === 0) {
      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              You cannot take a quiz because there are no cards in the deck.
            </Text>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Please add some cards and try again.
            </Text>
          </View>
        </View>
      );
    }

    if (this.state.show === screen.RESULT) {
      const { correct, questionCount } = this.state;
      const percent = ((correct / questionCount) * 100).toFixed(0);
      const resultStyle =
        percent >= 70 ? styles.resultTextGood : styles.resultTextBad;

      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Quiz Complete!
            </Text>
            <Text style={resultStyle}>
              {correct} / {questionCount}
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Your Grade:
            </Text>
            <Text style={resultStyle}>{percent}%</Text>
          </View>
          <View>
            <TouchableOpacity
              style={[globalStyles.button]}
              onPress={() => {
                this.handleReset();
              }}
              >
              <Text style={globalStyles.buttonText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[globalStyles.button]}
              onPress={() => {
                this.handleReset();
                this.props.navigation.goBack();
              }}
              >
              <Text style={globalStyles.buttonText}>Back To Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[globalStyles.button]}
              onPress={() => {
                this.handleReset();
                this.props.navigation.navigate('Home');
              }}
              >
              <Text style={globalStyles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <ViewPager
        style={styles.container}
        scrollEnabled={true}
        onPageSelected={this.handlePageChange}
        ref={viewPager => {
          this.viewPager = viewPager;
        }}
      >
        {questions.map((question, index) => {
          let isDisabled = this.state.answered[index] === 1;

          return (
            <View style={styles.pageStyle} key={index}>
            <View style={styles.block}>
              <Text style={styles.resultTextGood}>
                {index + 1} / {questions.length}
              </Text>
            </View>
            <View style={[styles.block, styles.questionContainer]}>
              <Text style={styles.questionText}>
                {show === screen.QUESTION ? 'Question' : 'Answer'}
              </Text>
              <View style={styles.questionWrapper}>
                <Text style={styles.title}>
                  {show === screen.QUESTION
                    ? question.question
                    : question.answer}
                </Text>
              </View>
            </View>
            {show === screen.QUESTION ? (
              <TouchableOpacity
                style={[globalStyles.button]}
                onPress={() => this.setState({ show: screen.ANSWER })}
                >
                <Text style={globalStyles.buttonText}>Show Answer</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[globalStyles.button]}
                onPress={() => this.setState({ show: screen.QUESTION })}
                >
                <Text style={globalStyles.buttonText}>Show Question</Text>
              </TouchableOpacity>
            )}
            <View>
              <TouchableOpacity
                style={isDisabled ? globalStyles.buttonDisabled : globalStyles.button}
                onPress={() => this.handleAnswer(answer.CORRECT, index)}
                disabled={isDisabled}
                >
                <Text style={globalStyles.buttonText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={isDisabled ? globalStyles.buttonDisabled : globalStyles.button}
                onPress={() => this.handleAnswer(answer.INCORRECT, index)}
                disabled={isDisabled}
              >
                <Text style={globalStyles.buttonText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
          );
          })}
      </ViewPager>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageStyle: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: Colors.gray,
    justifyContent: 'space-around'
  },
  block: {
    marginBottom: 20
  },
  count: {
    fontSize: 24
  },
  title: {
    fontSize: 32,
    textAlign: 'center'
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: Colors.darkGray,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexGrow: 1
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  questionText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 20
  },
  resultTextGood: {
    color: Colors.green,
    fontSize: 46,
    textAlign: 'center'
  },
  resultTextBad: {
    color: Colors.red,
    fontSize: 46,
    textAlign: 'center'
  }
});

const mapStateToProps = (state, { title }) => {
  const deck = state[title];

  return {
    deck
  };
};

export default withNavigation(connect(mapStateToProps)(Quiz_Android));
