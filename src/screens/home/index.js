/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

import CategoryCard from '../../components/categoryCard';
import styles from './styles';

export default class Home extends Component {
  constructor(props) {
    super(props);

    console.log('HOME TAB')
    console.log(this.props)
  }

  render() {

    return (
      <ScrollView style={styles.container}>
        <View testID="Home">

          <View style={styles.header}>
            <View style={styles.degree}>
              <View style={styles.degreeIcon} />
              <Text style={styles.degreeTxt}>お酒をたしなむ人</Text>
            </View>

            <View style={styles.summary}>
              <View style={styles.total}>
                <Text style={styles.num}>124</Text>
                <Text style={styles.label}>杯</Text>
              </View>
              <View style={styles.badges}>
                <Text style={styles.num}>12</Text>
                <Text style={styles.label}>獲得バッジ</Text>
              </View>
            </View>
          </View>

          <View style={styles.category}>
            <Text style={styles.headLine}>カテゴリ</Text>
            <View style={styles.categoryCards} />
            <View style={styles.row}>
              <CategoryCard categoryName="カクテル" />
              <CategoryCard categoryName="ワイン" />
              <CategoryCard categoryName="ビール" />
            </View>
            <View style={styles.row}>
              <CategoryCard categoryName="日本酒" />
              <CategoryCard categoryName="焼酎" />
              <CategoryCard categoryName="ウイスキー" />
            </View>

          </View>

          <View style={styles.timeLine}>
            <Text style={styles.headLine}>タイムライン</Text>
          </View>

        </View>
      </ScrollView>
    );
  }

}
