
import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import styles from './styles';

const { width, height } = Dimensions.get('window');
const badgeSize = (width - 64 - 32) / 3;
const radius = badgeSize /2;
const rowHeight = badgeSize + 80;

export default class Badges extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <Text style={styles.headLine}>バッジ</Text>
            <View  style={[styles.row, {height: rowHeight}]}>
              {this.renderBadge()}
              {this.renderBadge()}
              {this.renderBadge()}
            </View>

            <View  style={[styles.row, {height: rowHeight}]}>
              {this.renderBadge()}
              {this.renderBadge()}
              {this.renderBadge()}
            </View>

            <View  style={[styles.row, {height: rowHeight}]}>
              {this.renderBadge()}
              {this.renderBadge()}
              {this.renderBadge()}
            </View>

            <View  style={[styles.row, {height: rowHeight}]}>
              {this.renderBadge()}
              {this.renderBadge()}
              {this.renderBadge()}
            </View>
        </ScrollView>

        <View style={[styles.modal, {width, height}]}>
          <View style={[styles.filter, {marginTop: height / 2 - 30 - 64}]}>
            <Text style={styles.commingSoon}>Comming soon</Text>
          </View>
        </View>

      </View>
    );
  }

  renderBadge() {
    return (
      <View style={styles.badgeContainer}>
        <View style={[styles.badge, {width: badgeSize, height: badgeSize, borderRadius: radius}]} />
        <Text>バッジ名</Text>
      </View>
    )
  }
}
