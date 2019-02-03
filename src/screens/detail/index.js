import React, { Component } from 'react';
import { Text, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import CategoryIcon from '../../components/categoryIcon';
import styles from './styles';

@connect(state => ({
  post: state.post,
}))
export default class Detail extends Component {
  render() {
    const {
      post 
    } = this.props;
    const postedDate = moment(post.data.timestamp).format('MM月DD日');

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <CategoryIcon categoryName={post.data.categoryName} size={60} style={styles.icon} />
          <View style={styles.flex}>
            <Text style={styles.name} numberOfLines={2}>{post.data.sakeName}</Text>
            <View style={styles.detail}>
              {!!post.data.areaName && !post.data.companyName &&
                <Text style={styles.detailTxt} numberOfLines={1}>{post.data.areaName}</Text>
              }
              {!!post.data.companyName && !post.data.areaName &&
                <Text style={styles.detailTxt} numberOfLines={1}>{post.data.companyName}</Text>
              }
              {!!post.data.areaName && !!post.data.companyName &&
                <Text style={styles.detailTxt} numberOfLines={1}>{post.data.areaName + '  ' + post.data.companyName}</Text>
              }
              </View>
            </View>
        </View>
        <View style={styles.stars}>
          <StarRating
            disabled
            maxStars={5}
            rating={post.data.starCount}
            starSize={16}
            starStyle={{ marginRight: 4 }}
            containerStyle={{ justifyContent: 'flex-start'}}
            fullStarColor="orange"
            emptyStarColor="orange"
          />
        </View>
        <Text style={styles.contentTxt}>{post.data.text}</Text>
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
    navigation.push('Edit');
  }
}
