import firebase from 'react-native-firebase';
import algoliasearch from 'algoliasearch/reactnative';

import CONFIG from './config';

const GOO_API_KEY = CONFIG.GOO_API_KEY;

// Algolia クライアントを設定
const ALGOLIA_ID = CONFIG.ALGOLIA_ID;
const ALGOLIA_ADMIN_KEY = CONFIG.ALGOLIA_ADMIN_KEY;
const algolia = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = algolia.initIndex('masterSake');
let uid;

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

  init = async () => new Promise(resolve => {
    let userCollection = this.user;
    firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        this.uid = user.uid;
        uid = user.uid
      } else {
        firebase.auth().signInAnonymously()
        .then(() => {
          this.uid = (firebase.auth().currentUser || {}).uid;
          uid = (firebase.auth().currentUser || {}).uid;
          userCollection.doc(`${this.uid}`).set({
            name: '匿名',
          });
        })
        .catch(error => {
          console.log('ERROR:' + error);
        });
      }

      resolve(this.uid)
    });
  })

  getIndex = async (keyWords) => {
    let uniqueKeyWords = keyWords.filter(function (x, i, self) {
      return self.indexOf(x) === i;
    });
    let queries = [];
    uniqueKeyWords.map((keyWord) => {
      queries.push({
        indexName: 'masterSake',
        query: keyWord,
      })
    });

    return new Promise((resolve, reject ) => {
      algolia.search(queries, function (err, content) {
        if (err) {
          reject(err);
          return;
        }

        let array = [];
        content.results.map((result) => {
          array = array.concat(result.hits)
        })

        let uniqueArray = array.filter((x, i, self) => {
          return self.findIndex(v => {
            return x.name === v.name 
          }) === i
        });

        resolve(uniqueArray)
      });
    })
  }

  getPosts = async (uid = '', cursor = null, num = 5) => {
    let ref = this.post.where('user', '==', this.user.doc(uid)).orderBy('timestamp', 'desc').limit(num);
    try {
      if (cursor) {
        ref = ref.startAfter(cursor);
      }

      const querySnapshot = await ref.get();
      const data = [];
      await Promise.all(querySnapshot.docs.map(async (doc) => {
        if (doc.exists) {
          const post = doc.data() || {};
          data.push({
            key: doc.id,
            post,
          });
        }
      }));

      const lastVisible = querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null;

      return { data, cursor: lastVisible };
    } catch ({ message }) {
      return { error: message };
    }
  }

  createPost = async (categoryId = 0, categoryName = '', sakeName = '', starCount = 0, text = '') => {
    try {
      const post = {
        categoryId,
        categoryName,
        sakeName,
        starCount,
        text,
        timestamp: Date.now(),
        user: this.user.doc(`${uid}`),
      }
      await this.post.add(post);

      return { post }
    } catch ({ message }) {
      return { error: message };
    }
  }

  updatePost = async (key = '', categoryId = 0, categoryName = '', sakeName = '', starCount = 0, text = '') => {
    try {
      await this.post.doc(`${key}`).update({
        categoryId,
        categoryName,
        sakeName,
        starCount,
        text,
        timestamp: Date.now(),
      });

      return true
    } catch ({ message }) {
      return { error: message };
    }
  }
}

// KAORU: 呼び出す側でnewした方が良い?
const fire = new Firebase();
export default fire;
