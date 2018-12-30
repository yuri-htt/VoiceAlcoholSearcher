import React, { Component } from 'react';
import firebase from 'react-native-firebase';

// import firebase from '../firebase';
import Navigation from '../navigation';

export default class Root extends Component {
  constructor() {
    super();
    // firebase.init();
    firebase.auth().signInAnonymously();
      // this.uid = (firebase.auth().currentUser || {}).uid;
      // this.user.doc(`${this.uid}`).set({
      //   name: Constants.deviceName,
      // });
  }

  loadResourcesAsync = async () => {
    // await firebase.init();

    /* asset */
    await Asset.loadAsync(Object.keys(images).map(key => images[key]));

    return true;
  }

  render() {
    return (
      <Navigation />
    );
  }
}