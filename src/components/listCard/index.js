import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import moment from 'moment';

import CategoryIcon from '../categoryIcon';
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

        <CategoryIcon categoryName={post.categoryName} style={{marginRight: 16}} />

        <View style={styles.rightColumn}>
          {post.sakeName != '' && (
            <Text style={styles.titleText}>{post.sakeName}</Text>
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
        </View>
      </View>
    );
  }
}
