/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Post from '../components/screens/post';

import * as AppActions from '../redux/modules/app';

export class App extends Component {
  componentDidMount() {
    const {
      auth,
      actions,
    } = this.props;

    actions.setLaunchedApp();
  }

  render() {
    return (
    <Post {...this.props} />
    )
  }
}
  
export default connect(
  state => ({ ...state }),
  dispatch => ({
    actions: bindActionCreators({
      ...AppActions,
    }, dispatch),
  }),
)(App);

