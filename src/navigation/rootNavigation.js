import React from 'react';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';

import AppNavigator from './appNavigator';

const App = reduxifyNavigator(AppNavigator, "root");

export default class AppWithNavigationState extends React.Component {
  render() {
    const { nav, dispatch } = this.props;

    return <App dispatch={dispatch} state={nav} />;
  }
}