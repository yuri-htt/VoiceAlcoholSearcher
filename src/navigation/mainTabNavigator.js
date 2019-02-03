import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

/* from app */
import HomeScreen from '../screens/home';
import PostScreen from '../screens/post';
import BadgesScreen from '../screens/badges';

import {
  HomeTabIcon,
  PostTabIcon,
  BadgesTabIcon,
  TabBar,
} from '../components/tabs';

const createTabStack = (title, screen) => createStackNavigator({
  [title]: { screen },
});

export default createBottomTabNavigator(
  {
    HomeTab: {
      screen: createTabStack('HomeTab', HomeScreen),
      navigationOptions: () => ({
        tabBarIcon: HomeTabIcon,
        gesturesEnabled: true,
      }),
    },
    PostTab: {
      screen: createTabStack('PostTab', PostScreen),
      navigationOptions: () => ({
        tabBarIcon: PostTabIcon,
      }),
    },
    // BadgesTab: {
    //   screen: createTabStack('BadgesTab', BadgesScreen),
    //   navigationOptions: () => ({
    //     tabBarIcon: BadgesTabIcon,
    //   }),
    // },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#333',
      inactiveTintColor: '#bbb',
      style: {
        backgroundColor: '#fff',
      },
    },
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: true,
  },
);
