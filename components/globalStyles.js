import { StyleSheet } from 'react-native';

import * as Colors from '../utils/colors';

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    borderColor: Colors.textGray,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 20
  },
  buttonDisabled: {
    backgroundColor: Colors.gray,
    borderColor: Colors.textGray,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold'
  }
});