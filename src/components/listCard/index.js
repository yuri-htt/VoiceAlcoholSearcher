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

        <View style={styles.leftColumn}>
          <CategoryIcon categoryName={post.categoryName} style={{marginRight: 16}} />
        </View>

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
              starStyle={{ marginRight: 2 }}
              containerStyle={{ justifyContent: 'flex-start'}}
              fullStarColor="orange"
              emptyStarColor="orange"
            />
          </View>
        </View>
      </View>
    );
  }
}
