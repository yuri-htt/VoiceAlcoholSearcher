import React, { Component } from 'react';

import firebase from '../firebase';
import Navigation from '../navigation';

export default class Root extends Component {
  constructor() {
    super();
    
    this.state = {
      isLoadingComplete: false,
    };
    firebase.init();
  }

  componentDidMount() {
    firebase.init();
  }

  render() {
    return (
      <Navigation />
    );
  }
}