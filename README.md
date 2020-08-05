# Udacity ReactND Project - Mobile Flashcards

The Mobile Flashcards app is the 3rd and final project required for the Udacity React Nanodegree program. 
This is a React Native app so the same codebase is used to create packages for both Androids and iOS. 

The Mobile Flashcards app allows the user to create decks. Each deck contains a set of cards with a question and an answer.

The user can start a quiz for a given deck and evaluate themselves for correct or incorrect answers.
Users are given a score at the end of completing a quiz session.

A scheduled notification is shown everyday at 8:00 pm if the user hasn't attempted at least one quiz question for that day.

## Technical Specs

The app uses the following packages:

### Core:
- react
- react-native
- expo

### Navigation:
- react-navigation
- react-navigation-tabs
- Async Storage: I am using the recommended package from react-native-community
- UI Toolkit: I am using icons from react-native-ionicons
- State Management: I am using Redux
- This is not an expo application. You need to have either the iOS simulator or Android emulator.

See the package.json file for more info on installed dependencies.


## Installation

1. You need to have Node.js, npm and yarn installed
2. Proceed by cloning or downloading the project as a zip
3. Extract and change directory to the project folder
4. Open your Terminal or Command prompt and type ```yarn install```
5. cd ios
6. ```pod install```
6. cd ..
7. To run the iOS version, run:  ```npx react-native run-ios```
8. To run the Android version, run:  ```npx react-native run-android```

## How to Run the App
The app has been tested on both Android and iOS physical emulators. 

- Install either iOS simulator or Android emulator.
- All your devices (computer running the Metro Bundler, Android and iOS device) should be connected on the same local area network


