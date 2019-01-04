import React, { Component } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  Dimensions, 
  Image,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import StarRating from 'react-native-star-rating';

import firebase from '../../firebase';
import images from '../../components/images';
import styles from './styles';

const { width, height } = Dimensions.get('window');

export default class Add extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const item = navigation.getParam('item', null);

    this.state = {
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      sakeName: item.name,
      starCount: 0,
      text: '',
    };
  }

  render() {
    const {
      categoryName,
      sakeName,
      starCount,
      text,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={[{width}, styles.contents]}>
          <View style={styles.sake}>
            <Image
                style={styles.icon}
                source={this.getCategoryIcon(categoryName)}
              />
            <Text>{sakeName}</Text>
          </View>
        
          <View style={[styles.row, styles.starContainer]}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={starCount}
              selectedStar={rating => this.onPressStarRating(rating)}
              starSize={28}
              buttonStyle={{ marginHorizontal: 8 }}
              fullStarColor="orange"
              emptyStarColor="orange"
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              multiline
              style={[styles.textInput]}
              underlineColorAndroid="transparent"
              placeholder="お酒の感想を記載しましょう"
              textAlignVertical="top"
              value={text}
              onChangeText={this.onChangeText}
            />
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => this.onPressSave()} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnTxt}>保存する</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onPressCancel()} style={styles.seondaryBtn}>
              <Text style={styles.secondaryBtnTxt}>キャンセル</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  getCategoryIcon = (categoryName) => {
    let icon;
    switch (categoryName) {
      case 'カクテル':
        icon = images.cooktail;
        break;
      case 'ワイン':
        icon = images.wine;
        break;
      case 'ビール':
        icon = images.beer;
        break;
      case '日本酒':
        icon = images.sake;
        break;
      case '焼酎':
        icon = images.syotyu;
        break;
      case 'ウイスキー':
        icon = images.whisky;
        break;
      default:
        icon = images.cooktail;
        break;
    }
    return icon;
  }

  onPressStarRating(rating) {
    this.setState({
      starCount: rating,
    });
  }

  onChangeText = (text) => {
    this.setState({ text });
  }

  // dispatchはnavigationから発火させるのであった！ 
  // onPressSave() {
  //   const { navigation } = this.props;
  //   navigation.dispatch({ type: 'LAUNCH' });
  // }

  onPressSave = async () => {
    const {
      categoryId,
      categoryName,
      sakeName,
      starCount,
      text,
    } = this.state;
    const { navigation } = this.props;

    Keyboard.dismiss();

    const result = await firebase.createPost(categoryId, categoryName, sakeName, starCount, text);
    if (result.error) {
      console.log(result.error)
    } else {
      navigation.navigate('HomeTab');
      this.setState({
        categoryId: 0,
        categoryName: '',
        sakeName: '',
        starCount: 0,
        text: '',
      });
    }
  }

  onPressCancel() {
    // 
  }
}