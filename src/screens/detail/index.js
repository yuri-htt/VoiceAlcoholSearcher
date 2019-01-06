import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CategoryIcon from '../../components/categoryIcon';
import styles from './styles';

export default class Detail extends Component {
  render() {
    const { navigation } = this.props;
    const post = navigation.getParam('post', null);
    const postedDate = moment(post.timestamp).format('MM月DD日');

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <CategoryIcon categoryName={post.categoryName} size={60} style={styles.icon} />
          <Text style={styles.name}>{post.sakeName}</Text>
        </View>
        <View style={styles.stars}>
          <StarRating
            disabled
            maxStars={5}
            rating={post.starCount}
            starSize={16}
            starStyle={{ marginRight: 4 }}
            containerStyle={{ justifyContent: 'flex-start'}}
            fullStarColor="orange"
            emptyStarColor="orange"
          />
        </View>
        <Text style={styles.contentTxt}>{post.text}</Text>
        <Text style={styles.dateTxt}>{postedDate}</Text>

        <ActionButton 
          buttonColor="#212121"
          renderIcon={() => <Icon name="edit" size={24} color="rgba(255,255,255,1)" />}
          onPress={() => this.onOPressEdit()}
        />

      </View>
    );
  }

  onOPressEdit() {
    const { navigation } = this.props;
    const post = navigation.getParam('post', null);
    navigation.push('Edit', { post });
  }
}
