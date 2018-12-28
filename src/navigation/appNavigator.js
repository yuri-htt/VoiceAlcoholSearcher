
import { createStackNavigator, NavigationActions } from 'react-navigation';

/* screen */
import MainTabNavigator from './mainTabNavigator';
import PostScreen from '../components/screens/post';
import BadgesScreen from '../components/screens/badges';

const CardNavigator = createStackNavigator(
  {
    Main: { screen: MainTabNavigator, navigationOptions: { header: null } },
    Post: { screen: PostScreen },
    Badges: { screen: BadgesScreen },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        color: '#333',
      },
      headerStyle: {
        backgroundColor: '#fff',
        height: 44,
      },
    }),
  },
);

const AppNavigator = createStackNavigator(
  {
    MainStack: {
      screen: CardNavigator,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: () => ({
      headerTitleStyle: {
        color: '#333',
      },
    }),
  },
);

const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action;

  if (state && type === NavigationActions.NAVIGATE) {
    if (routeName === state.routes[state.routes.length - 1].routeName) {
      return null;
    }
  }

  return getStateForAction(action, state);
};

export const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];

  if (route.routes) {
    return getActiveRouteName(route);
  }

  return route.routeName;
};

AppNavigator.router.getStateForAction = navigateOnce(AppNavigator.router.getStateForAction);

export default AppNavigator;
