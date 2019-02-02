import React, { Component } from 'react';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
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
    end: false,
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
    Voice.onSpeechEnd = this.onSpeechEnd;
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
        }
      ),
      Animated.delay(2000),
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

  onSpeechEnd = e => {
    this.setState({
      end: true,
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
      showModal: true,
      searching: true,
      animation: false,
    });

    await Voice.stop();
    await this.waitForpartialResults();
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

  waitForpartialResults() {
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
      if (uniqueAllCandidates.length > 0) {
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
          .catch(error => console.log(error));
        });
      } else {
        this.setState({searching: false});
      }
      
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
      end: false,
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

  renderCandidateListCard(item, index) {
    if (item === undefined) return;
    return (
      <TouchableOpacity onPress={() => this.onPressCard(item)} key={`match-list-${index}-View`}>
        <View style={[styles.candidateCard, {width: width - 64}]}>

          <CategoryIcon categoryName={item.categoryName} style={{ marginRight: 16 }}/>
          
          <View style={styles.flex}>
            <Text style={styles.categoryCardTxt} numberOfLines={1} ellipsizeMode="tail" >{item.name}</Text>
            <View style={styles.detail}>
              {!!item.areaName &&
                <Text style={styles.detailTxt}>{item.areaName}</Text>
              }
              {!!item.companyName &&
                <Text style={styles.detailTxt}>{'  ' + item.companyName}</Text>
              }
            </View>
          </View>

        </View>
      </TouchableOpacity>
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

    const NoSpeetchInputError = (this.state.error !== '') && (this.state.error === '{"message":"6/No speech input"}')
    const NoMatchError = (this.state.error !== '') && (this.state.error === '{"message":"7/No match"}')

    if (this.state.showModal) {
      return (
        <Modal
          animationType="slide"
          onRequestClose={() => this.setState({showModal: false})}
          transparent
          visible
        >
          <View style={styles.modalContainer}>

          <TextInput
            style={{width: width - 64, height: 60, paddingHorizontal: 16, borderRadius: 8, borderColor: '#BDBDBD', borderWidth: 1}}
            value={this.state.results[0]}
            editable={false}
          />

            <View style={[styles.modal, {width, height: height - 214}]} >

            {this.state.searching &&
            <View style={[styles.modal, {width, height: height - 190 }, styles.center]} >
              <ActivityIndicator size="large" color="#FF9800" />
            </View>
            }

            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            {!this.state.searching　&& this.state.matchLists.length > 0 && this.state.matchLists.map((result, index) => {
              return (
                <View key={`partial-result-${index}-View`}>
                  {this.renderCandidateListCard(result, index)}
                </View>
              )
            })}
            </ScrollView>

            {!this.state.searching　&& this.state.matchLists.length === 0 && 
             <View style={{flex: 1}}>
              <Text>該当0件</Text>
              </View>
            }

            </View>

            <TouchableOpacity style={[styles.dismiss]} onPress={() => this.setState({showModal: false, searching: false})}>
              <Ionicon name="ios-close-circle-outline" size={50} />
            </TouchableOpacity>
          </View>
        </Modal>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.guideTxt}>お酒の名前を教えてください。</Text>
        <View style={styles.voiceContainer}>
          <ImageBackground style={styles.voice} source={images.voiceShape}>
            <Text style={styles.stat}>
              {this.state.results[0]}
            </Text>
          </ImageBackground>
        </View>
  
        <View style={{ marginBottom: 64 }}>
          <View style={styles.mikeContainer}>
            <Animated.View style={[styles.animateContainer, {transform: [{rotate: deg}]}]} >
              <Image style={styles.circle} source={images.dotsCircle} />
            </Animated.View>
            <TouchableOpacity onPress={this._startRecognizing}>
              <Image style={styles.button} source={images.mike} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{height: 104, justifyContent: 'center', alignItems: 'center'}}>
        {NoSpeetchInputError &&
          <TouchableOpacity onPress={this._destroyRecognizer} style={styles.seondaryBtn}>
            <Text style={styles.secondaryBtnTxt}>再トライ</Text>
          </TouchableOpacity>
        }

        {NoMatchError &&
          <TouchableOpacity onPress={this._destroyRecognizer} style={styles.seondaryBtn}>
            <Text style={styles.secondaryBtnTxt}>再トライ</Text>
          </TouchableOpacity>
        }
        
        
        {!NoSpeetchInputError && !NoMatchError && this.state.end &&
          <View>
            <View style={{width: 280, height: 52}}>
            {this.state.end &&
              <TouchableOpacity onPress={ () => this.startSerching()} style={styles.primaryBtn}>
                <Text style={styles.primaryBtnTxt}>検索する</Text>
              </TouchableOpacity>
            }
            </View>
            
            <View style={{width: 280, height: 52}}>
              <TouchableOpacity onPress={this._destroyRecognizer} style={styles.seondaryBtn}>
                <Text style={styles.secondaryBtnTxt}>クリア</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        </View>
        
      </View>
    );
  }
}

