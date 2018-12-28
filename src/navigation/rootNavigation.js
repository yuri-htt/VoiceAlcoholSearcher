import React from 'react';
// import { reduxifyNavigator } from 'react-navigation-redux-helpers';

import {
  createStackNavigator,
} from 'react-navigation';

import Post from '../components/screens/post';
// import AppNavigator from './appNavigator';
// const App = reduxifyNavigator(AppNavigator, 'root');

// import AppNavigator from './appNavigator';
// const AppNavigator = createStackNavigator({
//   Post: { screen: Post },
// });

export default class AppWithNavigationState extends React.Component {
  render() {
    const { nav, dispatch } = this.props;

    return <App dispatch={dispatch} state={nav} />;
    // 下記はうまくいくのでrootはわるくない
    // return <Post {...this.props}/>
  }
}