import React from 'react';
import { Provider, connect } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import { StatusBar, Platform, View } from 'react-native';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { createLogger } from 'redux-logger';

import AppNavigator, { getActiveRouteName } from './appNavigator';
import firebase from '../firebase';
import reducers from '../redux/reducers';
import user from '../redux/modules/user';

const navReducer = createNavigationReducer(AppNavigator);

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const screenTracking = store => next => (action) => {
  if (action.type.indexOf('Navigation') === -1 || action.type === 'TAKEMODAL_CLOSE') {
    return next(action);
  }

  const currentScreen = getActiveRouteName(store.getState().nav);
  const result = next(action);
  const nextScreen = getActiveRouteName(store.getState().nav);

  store.dispatch({
    type: 'SCREEN_SET',
    payload: {
      current: currentScreen,
      next: nextScreen,
    },
  });

  return result;
};

const store = createStore(
  // ここに...reducersがあることでstateにappとuserも追加されている
  combineReducers({ ...reducers, nav: navReducer, user }),
  applyMiddleware(
    createReactNavigationReduxMiddleware(
      'root',
      state => state.nav,
      // state => state,
    ),
    logger,
    screenTracking,
  ),
);

const App = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = (state) => {
  // stateにはapp.user, navがあるが、Navigationではnav以外うけつけない
  return {state: state.nav}
};

const AppWithNavigationState = connect(mapStateToProps)(App);


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
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </View>
    )
  }
}