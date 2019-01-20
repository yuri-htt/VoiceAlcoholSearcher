import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import CategoryCard from '../../components/categoryCard';
import ListCard from '../../components/listCard';
import firebase from '../../firebase';
import images from '../../components/images';
import styles from './styles';

const { width, height } = Dimensions.get('window');

@withNavigationFocus
@connect(state => ({
  currentScreen: state.screen,
  app: state.app,
  user: state.user,
  posts: state.posts,
}))
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;

    // ユーザーの取得
    const uid = await firebase.init();

    // アプリの使用が２回目以降のユーザー
    if (uid) {
      navigation.dispatch({ type: 'SET_USER', payload: uid });
      this.getPosts(uid);
      this.setState({ loading: false })

      // マイクの権限確認
      const isGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      if (!isGranted) {
        this.requestMikePermission()
      }
    }
  }

  async requestMikePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          'title': 'Microphone Permission',
          'message': 'SAKE BOARD needs access to your microphone'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  getPosts = async (cursor = null) => {
    const { navigation } = this.props;

    const response = await firebase.getPosts(cursor);
    if (!response.error) {
      this.setState({
        posts: response.data,
      });
      navigation.dispatch({ type: 'SET_POSTS', payload: response.data });
    } else {
      console.log(response.error)
    }
  }

  onPressOK() {
    const { navigation } = this.props;
    navigation.dispatch({ type: 'SET_STARTER_MODAL', payload: false });
    const uid = firebase.getUid();
    console.log(uid)
    navigation.dispatch({ type: 'SET_USER', payload: uid });
    this.requestMikePermission();
  }

  closeStarterModal() {
    const { navigation } = this.props;
    navigation.dispatch({ type: 'SET_STARTER_MODAL', payload: false });
  }

  render() {
    const {
      loading,
    } = this.state;
    const { 
      posts,
      app,
    } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View testID="Home">

          <View style={styles.header}>
            <View style={styles.degree}>
              <Image
                style={{width: 60, height: 60}}
                source={images.logo}
              />
              <Image
                style={{width: 60, height: 7}}
                source={images.logoTxt}
              />
            </View>

            <View style={styles.summary}>
              <View style={styles.total}>
                <Text style={styles.num}>{posts.data.length}</Text>
                <Text style={styles.label}>杯</Text>
              </View>
              <View style={styles.badges}>
                <Text style={styles.num}>0</Text>
                <Text style={styles.label}>獲得バッジ</Text>
              </View>
            </View>
          </View>

          <View style={styles.category}>
            <Text style={styles.headLine}>カテゴリ</Text>
            <View style={styles.categoryCards} />
            <View style={styles.row}>
              <CategoryCard categoryName="カクテル" {...this.props} />
              <CategoryCard categoryName="ワイン" {...this.props} />
              <CategoryCard categoryName="ビール" {...this.props} />
            </View>
            <View style={styles.row}>
              <CategoryCard categoryName="日本酒" {...this.props} />
              <CategoryCard categoryName="焼酎" {...this.props} />
              <CategoryCard categoryName="ウイスキー" {...this.props} />
            </View>

          </View>

          <View style={styles.timeLine}>
            <Text style={styles.headLine}>タイムライン</Text>
            {posts.data.length === 0 &&
              <View style={styles.empty}>
                <Text style={styles.emptyTxt}>まだ飲んだお酒はありません</Text>
                <Text style={styles.emptyTxt}>さっそく今晩飲みに行きませんか？</Text>
              </View>
            }
            {posts.data.length > 0 &&
            <View style={styles.timeLineCards}>
              <FlatList
                data={posts.data}
                keyExtractor={item => item.key}
                renderItem={item => <ListCard item={item} {...this.props} />}
                ListFooterComponent={() => (loading ? <View style={styles.loading}><ActivityIndicator size="small" /></View> : null)}
                onEndReachedThreshold={0.1}
                onEndReached={this.onEndReached}
              />
            </View>
            }
            
          </View>

        </View>

        {app.isFirstTime &&
          <Modal
            animationType="fade"
            onRequestClose={() => this.closeStarterModal()}
            transparent
            visible
          >
            <View style={[styles.modalContainer, { width, height }]}>
              <View style={styles.modal}>
              <Image
                style={styles.modalImg}
                source={images.logoHeart}
              />
                <Text style={styles.modalTitleTxt}>DLありがとうございます！</Text>
                <Text style={styles.modalContentTxt}>{'SAKE BOARDを使うために\nマイクへのアクセス許可をお願いします！'}</Text>
                <TouchableOpacity onPress={() => this.onPressOK()} style={styles.primaryBtn}>
                  <Text style={styles.primaryBtnTxt}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        }
         
      </ScrollView>
    );
  }

}
