import React from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import firebase from '../firebase';
import store from '../redux/store';

import AppWithNavigationState from './rootNavigation';

export default class Navigation extends React.Component {  
  async componentDidMount() {
    const uid = await firebase.init();
    store.dispatch({
      type: 'SET_USER',
      payload: {
        uid,
      },
    })
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </View>
    )
  }
}