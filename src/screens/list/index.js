import React, { Component } from 'react';
import { 
  Text, 
  View, 
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import ListCard from '../../components/listCard';
import styles from './styles';


@connect(state => ({
  posts: state.posts,
}))
export default class List extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const categoryName = navigation.getParam('categoryName', null);

    this.state = {
      categoryName,
      fetching: false,
      loading: false,
    };
  }
  componentDidMount() {

  }

  render() {
    const {
      posts,
    } = this.props;
    const {
      categoryName,
      loading,
      fetching,
    } = this.state;

    const listByCategory = posts.data.filter(data => {
      return data.post.categoryName === categoryName
    })
    
    return (
      <View style={styles.container}>
        <Text style={styles.headLine}>{categoryName}</Text>
        {listByCategory.length === 0 &&
          <View style={styles.empty}>
            <Text style={styles.emptyTxt}>まだ飲んだお酒はありません</Text>
            <Text style={styles.emptyTxt}>さっそく今晩飲みに行きませんか？</Text>
          </View>
        }
        {listByCategory.length > 0 &&
        <View style={styles.timeLineCards}>
          <FlatList
            data={listByCategory}
            keyExtractor={item => item.key}
            renderItem={item => <ListCard item={item} {...this.props} />}
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
    );
  }


}