/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { 
  Text, 
  View, 
  Image, 
  TouchableHighlight, 
  Modal, 
  Dimensions, 
  ActivityIndicator 
} from 'react-native';
import Voice from 'react-native-voice';
import Ionicon from 'react-native-vector-icons/Ionicons';

import images from '../../components/images';
import firebase from '../../firebase';
import CONFIG from '../../config';
import styles from './styles';

const { width, height } = Dimensions.get('window');

// 初期のローディング処理
// ActionBinding
export default class Post extends Component {
  state = {
    recognized: '',
    error: '',
    started: '',
    results: [],
    partialResults: [],
    convertedResults: [],
    showModal: false,
    searching: false,
    matchLists: [],
  };

  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
  }

  componentDidMount() {
    // 音声認識開始
    this._startRecognizing()
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = e => {
    this.setState({
      recognized: '√',
    });
  };

  onSpeechError = e => {
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = e => {
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = e => {
    this.setState({
      partialResults: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      convertedResults: [],
      matchLists: [],
    });

    await Voice.start('ja-JP');
  };

  async startSerching() {
    const { navigation } = this.props;
    // 画面遷移させるかモーダルで出すか検討
    // navigation.push('MatchLists');
    this.setState({
      showModal: true,
      searching: true,
    });

    await Voice.stop();
    // partialResultsを取得するのに少し時間がかかる
    await this.witForpartialResults();
    await this.convertAllTexts()

    const response = await firebase.getIndex(this.state.convertedResults);
    if (!response.error) {
      this.setState({
        searching: false,
        matchLists: response,
      });
      console.log('LOOK')
      console.log(this.state.searching)
      console.log(this.state.matchLists.length)
      console.log(this.state.matchLists)
    }
    if (response.error) {
      this.setState({
        searching: false,
      });
      console.log('通信状況が良い環境で再トライ！')
    }
  }

  witForpartialResults() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve();
      }, 500);
    })
  }

  convertAllTexts() {
    return new Promise((resolve) => {
      this.state.partialResults.map((result, index) => {
        this.getConvertedText(result)
        .then(data => {
          this.setState({
            convertedResults: this.state.convertedResults.concat(data.converted)
          })
        })
        .then(() => {
          if (this.state.partialResults.length === index + 1) {
            return resolve();
          }
        })
        .catch(error => console.error(error));
      });
    })
  }

  getConvertedText = text => {
    return fetch('https://labs.goo.ne.jp/api/hiragana', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "app_id": CONFIG.GOO_API_KEY,
        "sentence": text,
        "output_type": "katakana"
      }),
    })
    .then(response => response.json())
  }

  _stopRecognizing = async () => {
    this.setState({
      showModal: true,
      searching: true,
    })
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }

    await this.convertAllTexts()
    
    const test = await firebase.getIndex(this.state.convertedResults);
    this.setState({
      searching: false,
    })
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
    this.setState({
      recognized: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      convertedResults: [],
      matchLists: [],
    });
  };

  render() {
    if (this.state.showModal) {
      return (
        <Modal
          animationType="slide"
          transparent
          visible
        >
          <View style={styles.modalContainer}>

            <View style={[styles.modal, {width: width - 32, height: height - (32 * 7) }]} >

            {this.state.searching &&
              <ActivityIndicator size="large" color="#0000ff" />
            }

            {!this.state.searching　&& this.state.matchLists.length > 0 && this.state.matchLists.map((result, index) => {
              return (
                <View key={`partial-result-${index}-View`}>
                {result.hits.map((hit, index) => {
                return (
                  <Text key={`partial-result-${index}-Text`} style={styles.stat}>
                    {hit.name}
                  </Text>
                )
                })}
                </View>
              )
            })}

            {!this.state.searching　&& this.state.matchLists.length === 0 && 
             <View style={{flex: 1, backgroundColor: 'red'}}>
              <Text>該当0件だよ</Text>
              </View>
            }

            </View>

            <TouchableHighlight style={[styles.dismiss]} onPress={() => {this.setState({showModal: false})}}>
              <Ionicon name="ios-close-circle-outline" size={44} style={styles.icon} />
            </TouchableHighlight>
          </View>
        </Modal>
      )
    }
    return (
      <View style={styles.container}>
      <Text style={styles.guideTxt}>お酒の名前を教えてください。</Text>
        <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>{`Recognized: ${this.state.recognized}`}</Text>
        <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
        <Text style={styles.stat}>Results</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>Partial Results</Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}

        <TouchableHighlight onPress={this._startRecognizing}>
          <Image style={styles.button} source={images.button} />
        </TouchableHighlight>

        <TouchableHighlight onPress={this._stopRecognizing}>
          <Text style={styles.action}>Stop Recognizing</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Text style={styles.action}>Destroy</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => this.startSerching()} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnTxt}>お酒を検索する</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this._destroyRecognizer} style={styles.seondaryBtn}>
          <Text style={styles.secondaryBtnTxt}>クリア</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

