import firebase from 'react-native-firebase';

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

class Firebase{
  constructor() {
    firebase.firestore().settings({ timestampsInSnapshots: true });

    // firestoreのコレクションへの参照を保持しておく
    this.user = firebase.firestore().collection('user');
    this.post = firebase.firestore().collection('post');
  }

  init() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.uid = user.uid;
      } else {
        firebase.auth().signInAnonymously()
        .then(() => {
          this.uid = (firebase.auth().currentUser || {}).uid;
        })
        .catch(error => {
          console.log('ERROR:' + error);
        });
      }
    });
  }
}

// KAORU: 呼び出す側でnewした方が良い?
const fire = new Firebase();
export default fire;
