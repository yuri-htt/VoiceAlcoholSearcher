import React, {Component} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import images from '../images';
import styles from './styles';

export default class CategoryCard extends Component {
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

  render() {
    const {
      categoryName,
    } = this.props;

    return (
      <TouchableOpacity style={styles.categoryCard} onPress={() => this.onPressCard()}>
        <Image
          style={styles.icon}
          source={this.getCategoryIcon(categoryName)}
        />
        <Text style={styles.categoryCardTxt}>{categoryName}</Text>
      </TouchableOpacity>
    );
  }

  onPressCard() {
    const { 
      navigation,
      categoryName,
     } = this.props;
    navigation.push('List', { categoryName });
  }
}
