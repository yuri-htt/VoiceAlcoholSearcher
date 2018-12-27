import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Dimensions } from 'react-native';

import App from './app';
import configureStore from '../redux/configureStore';

const store = configureStore();

export default class Root extends Component {
  constructor(props) {
    super(props);

    this.state = this.getDimensions();
  }

  getDimensions() {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  }

  updateDimensions = () => {
    this.setState(this.getDimensions());
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.updateDimensions);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateDimensions);
  }

  render() {
    return (
      // Connect the App component to this new redux API Client Store
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
