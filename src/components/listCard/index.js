import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import moment from 'moment';

import styles from './styles';

export default class CategoryCard extends Component {

  render() {
    const {
      item,
    } = this.props;

    const post = item.item.post;
    const postedDate = moment(post.timestamp).format('MM月DD日');

    return (
      <View style={styles.container} onLayout={this.onLayout}>

        {/* <TouchableOpacity style={styles.avatar} onPress={() => onUserPress(this.props)}>
          <Avatar uri={user.img} />
        </TouchableOpacity> */}

        <View style={styles.rightColumn}>
          {post.titleText != '' && (
            <Text style={styles.titleText}>{post.titleText}</Text>
          )}
          <Text style={styles.text}>{postedDate}</Text>
          <View style={styles.stars}>
            <StarRating
              disabled
              maxStars={5}
              rating={post.starCount}
              starSize={12}
              buttonStyle={{ marginHorizontal: 2 }}
              fullStarColor="orange"
              emptyStarColor="orange"
            />
          </View>
          {/*
          <Text style={styles.time}>{this.getRelativeTime(timestamp)}</Text>
          */}
        </View>
      </View>
    );
  }
}
