import React, { Component } from 'react';

import firebase from '../firebase';
import Navigation from '../navigation';

export default class Root extends Component {
  constructor() {
    super();
    this.state = {
      isLoadingComplete: false,
    };
  }

  render() {
    return (
      <Navigation />
    );
  } 
}