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
  FlatList,
  RefreshControl,
} from 'react-native';

import CategoryCard from '../../components/categoryCard';
import ListCard from '../../components/listCard';
import firebase from '../../firebase';
import styles from './styles';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      fetching: false,
      loading: false,
    };
  }

  async componentDidMount() {
    const uid = await firebase.init();
    this.getPosts(uid);
  }

  getPosts = async (cursor = null) => {
    this.setState({ fetching: true });
    const response = await firebase.getPosts(cursor);
    if (!response.error) {
      this.setState({
        posts: response.data,
      });
    } else {
      console.log(response.error)
    }
    this.setState({ fetching: false });
  }

  render() {
    const {
      posts,
      fetching,
      loading,
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View testID="Home">

          <View style={styles.header}>
            <View style={styles.degree}>
              {/* <View style={styles.degreeIcon} /> */}
              {/* <Text style={styles.degreeTxt}>お酒をたしなむ人</Text> */}
              <Image
                style={{width: 60, height: 60}}
                source={images.logo}
              />
              <Text>SAKE BOARD</Text>
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
            {posts.length > 0 &&
            <View style={styles.timeLineCards}>
            <FlatList
              data={posts}
              keyExtractor={item => item.key}
              renderItem={item => <ListCard item={item} />}
              refreshControl={(
                <RefreshControl
                  refreshing={fetching}
                  onRefresh={this.onRefresh}
                />
              )}
              ListFooterComponent={() => (loading ? <View style={styles.loading}><ActivityIndicator size="small" /></View> : null)}
              onEndReachedThreshold={0.1}
              onEndReached={this.onEndReached}
            />
            </View>
            }
          </View>

        </View>
      </ScrollView>
    );
  }

}
