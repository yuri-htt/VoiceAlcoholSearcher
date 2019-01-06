import React, { Component } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  Dimensions, 
  TouchableOpacity,
  Keyboard
} from 'react-native';
import StarRating from 'react-native-star-rating';

import CategoryIcon from '../../components/categoryIcon';
import firebase from '../../firebase';
import styles from './styles';

const { width } = Dimensions.get('window');

export default class Edit extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const post = navigation.getParam('post', null);
    this.state = {
      key: post.key,
      categoryId: post.categoryId,
      categoryName: post.categoryName,
      sakeName: post.sakeName,
      starCount: post.starCount,
      text: post.text,
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
              <CategoryIcon categoryName={categoryName} size={50} style={{marginRight: 16}}/>
            <Text style={styles.name}>{sakeName}</Text>
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

  onPressStarRating(rating) {
    this.setState({
      starCount: rating,
    });
  }

  onChangeText = (text) => {
    this.setState({ text });
  }

  onPressSave = async () => {
    const {
      key,
      categoryId,
      categoryName,
      sakeName,
      starCount,
      text,
    } = this.state;
    const { navigation } = this.props;

    Keyboard.dismiss();

    const result = await firebase.updatePost(key, categoryId, categoryName, sakeName, starCount, text);
    if (result.error) {
      console.log(result.error)
    } else {
      navigation.pop();
    }
  }

  onPressCancel() {
    const { navigation } = this.props;
    navigation.pop();
  }
}