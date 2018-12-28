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

import AppNavigator from './appNavigator';
import reducers from '../redux/reducers';

const navReducer = createNavigationReducer(AppNavigator);

const appReducer = combineReducers({
  nav: navReducer,
  reducers,
});

/* Store */
// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const store = createStore(
  appReducer,
  applyMiddleware(middleware),
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
