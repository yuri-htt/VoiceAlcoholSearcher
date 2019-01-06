import React, { Component } from 'react';
import { 
  Text, 
  View, 
  Image, 
  TouchableHighlight, 
  Modal, 
  Dimensions, 
  ActivityIndicator,
  TextInput,
  ScrollView,
  Animated,
  ImageBackground,
} from 'react-native';
import Voice from 'react-native-voice';
import Ionicon from 'react-native-vector-icons/Ionicons';

import CategoryIcon from '../../components/categoryIcon';
import images from '../../components/images';
import firebase from '../../firebase';
import CONFIG from '../../config';
import styles from './styles';

const { width, height } = Dimensions.get('window');

export default class Post extends Component {
  state = {
    recognized: false,
    error: '',
    started: false,
    results: [],
    partialResults: [],
    convertedResults: [],
    showModal: false,
    searching: false,
    matchLists: [],
    dotsCircleDegree: new Animated.Value(0),
    animation: true,
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
    this.state.dotsCircleDegree.setValue(0);
    this.startRotateAnimation();
    this._startRecognizing()
  }

  startRotateAnimation(n) {
    let i = 1;
    let toValue = n || i;
    Animated.sequence([
      Animated.timing(
        this.state.dotsCircleDegree, {
          toValue: toValue, 
          duration: 1000, 
          delay: 1000
        }
      ),
    ])
    .start((event) => {
      toValue++;
      if (event.finished && this.state.animation) {
        this.startRotateAnimation(toValue);
      }
    })
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    this.setState({
      started: '認識しています',
    });
  };

  onSpeechRecognized = e => {
    this.setState({
      recognized: true,
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
    this.setState({
      started: '',
      showModal: true,
      searching: true,
      animation: false,
    });

    await Voice.stop();
    // partialResultsを取得するのに少し時間がかかる
    await this.witForpartialResults();
    await this.convertAllTexts()
    console.log(this.state.convertedResults)

    const response = await firebase.getIndex(this.state.convertedResults);
    console.log(response)
    if (!response.error) {
      this.setState({
        searching: false,
        matchLists: response,
      });
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
      const allCandidates = this.state.results.concat(this.state.partialResults)
      const uniqueAllCandidates = allCandidates.filter((x, i, self) => {
        return self.indexOf(x) === i
      });
      uniqueAllCandidates.map((result, index) => {
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

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: false,
      error: '',
      results: [],
      partialResults: [],
      convertedResults: [],
      matchLists: [],
    });

    if (!this.state.animation) {
      this.startRotateAnimation();
      this.setState({
        animation: true,
      });
    }

    Voice.start('ja-JP');
  };

  renderCandidateListCard(item) {
    if (item === undefined) return;
    return (
      <TouchableHighlight onPress={() => this.onPressCard(item)}>
        <View style={[styles.candidateCard, {width: width - 64}]}>
          <CategoryIcon categoryName={item.categoryName} style={{ marginRight: 16 }}/>
          <Text style={styles.categoryCardTxt}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  onPressCard(item) {
    const { navigation } = this.props;
    this.setState({
      showModal: false,
    })
    navigation.push('Add', { item });
  }

  render() {
    let deg = this.state.dotsCircleDegree.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    if (this.state.showModal) {
      return (
        <Modal
          animationType="slide"
          transparent
          visible
        >
          <View style={styles.modalContainer}>

          <TextInput
            style={{width: width - 64, height: 60, paddingHorizontal: 16, borderRadius: 8, borderColor: '#BDBDBD', borderWidth: 1}}
            value={this.state.results[0]}
            editable={false}
          />

            <View style={[styles.modal, {width, height: height - 248 }]} >

            {this.state.searching &&
            <View style={[styles.modal, styles.center]} >
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
            }

            {!this.state.searching　&& this.state.matchLists.length > 0 && this.state.matchLists.map((result, index) => {
              return (
                <ScrollView key={`partial-result-${index}-View`}>
                {result.hits.map(hit => this.renderCandidateListCard(hit))}
                </ScrollView>
              )
            })}

            {!this.state.searching　&& this.state.matchLists.length === 0 && 
             <View style={{flex: 1, backgroundColor: 'red'}}>
              <Text>該当0件だよ</Text>
              </View>
            }

            </View>

            <TouchableHighlight style={[styles.dismiss]} onPress={() => {this.setState({showModal: false})}}>
              <Ionicon name="ios-close-circle-outline" size={50} />
            </TouchableHighlight>
          </View>
        </Modal>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.guideTxt}>お酒の名前を教えてください。</Text>
        <View style={styles.voiceContainer}>
          <ImageBackground style={styles.voice} source={images.voiceShape}>
          {this.state.results.map((result, index) => {
            return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
            );
          })}
          </ImageBackground>
        </View>
  
        <View style={{ marginBottom: 64 }}>
          <View style={styles.mikeContainer}>
            <Animated.View style={[styles.animateContainer, {transform: [{rotate: deg}]}]} >
              <Image style={styles.circle} source={images.dotsCircle} />
            </Animated.View>
            <TouchableHighlight onPress={this._startRecognizing}>
              <Image style={styles.button} source={images.mike} />
            </TouchableHighlight>
          </View>
        </View>

        <View style={{width: 280, height: 52}}>
        {this.state.recognized &&
          <TouchableHighlight onPress={ () => this.startSerching()} style={styles.primaryBtn}>
            <Text style={styles.primaryBtnTxt}>お酒を検索する</Text>
          </TouchableHighlight>
        }
        </View>
        
        <View style={{width: 280, height: 52}}>
        {this.state.recognized &&
        <TouchableHighlight onPress={this._destroyRecognizer} style={styles.seondaryBtn}>
          <Text style={styles.secondaryBtnTxt}>クリア</Text>
        </TouchableHighlight>
        }
        </View>
        
      </View>
    );
  }
}

