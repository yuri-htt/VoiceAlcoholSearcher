import React from 'react';
import { Provider } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import simpleStore from 'react-native-simple-store';

import store from '../redux/store';

import AppWithNavigationState from './rootNavigation';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    simpleStore.get('launchApp')
    .then(result => {
      
      if (!result) {
        simpleStore.save('launchApp', {
          launched: true,
        });

        store.dispatch({
          type: 'SET_STARTER_MODAL',
          payload: true,
        });
      }
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
