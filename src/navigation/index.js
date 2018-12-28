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
import reducers from '../redux/reducers';

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
  combineReducers({ ...reducers, nav: navReducer }),
  applyMiddleware(
    createReactNavigationReduxMiddleware(
      'root',
      state => state.nav,
    ),
    logger,
    screenTracking,
  ),
);

const App = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = (state) => ({
  state: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const Navigation = () => (
  <View style={{ flex: 1 }}>
    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  </View>
);

export default Navigation;
