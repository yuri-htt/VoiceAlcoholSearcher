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
import { connect } from 'react-redux';

import CategoryIcon from '../../components/categoryIcon';
import firebase from '../../firebase';
import styles from './styles';

const { width } = Dimensions.get('window');

@connect(state => ({
  user: state.user,
  posts: state.posts,
}))

export default class Add extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const item = navigation.getParam('item', null);

    this.state = {
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      sakeName: item.name,
      areaName: item.areaName,
      companyName: item.companyName,
      starCount: 0,
      text: '',
    };
  }

  render() {
    const {
      categoryName,
      sakeName,
      areaName,
      companyName,
      starCount,
      text,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={[styles.contents]}>
          <View style={styles.sake}>

            <CategoryIcon categoryName={categoryName} size={50} style={{marginRight: 16}}/>

            <View style={styles.flex}>
              <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">{sakeName}</Text>
              <View style={styles.detail}>
                {!!areaName && !companyName && 
                  <Text style={styles.detailTxt} numberOfLines={1}>{areaName}</Text>
                }
                {!!companyName && !areaName && 
                  <Text style={styles.detailTxt} numberOfLines={1}>{companyName}</Text>
                }
                {!!areaName && !!companyName && 
                  <Text style={styles.detailTxt} numberOfLines={1}>{areaName + '  ' + companyName}</Text>
                }
              </View>
            </View>
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
      categoryId,
      categoryName,
      sakeName,
      areaName,
      companyName,
      starCount,
      text,
    } = this.state;
    const {
      user,
      navigation,
    } = this.props;

    Keyboard.dismiss();

    const result = await firebase.createPost(categoryId, categoryName, sakeName, areaName, companyName, starCount, text);

    if (result.error) {
      console.log(result.error)
    } else {

      // navigation.dispatch({ type: 'ADD_POST', payload: result });
      navigation.navigate('HomeTab');

      const response = await firebase.getPosts(user.uid);
      if (!response.error) {
        navigation.dispatch({ type: 'SET_POSTS', payload: response.data });
      } else {
        console.log(response.error)
      }
    }
  }

  onPressCancel() {
    const { navigation } = this.props;
    navigation.pop();
  }
}