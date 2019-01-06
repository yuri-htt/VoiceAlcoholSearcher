
import { createStackNavigator, NavigationActions } from 'react-navigation';

/* screen */
import MainTabNavigator from './mainTabNavigator';
import AddScreen from '../screens/add/index';
import EditScreen from '../screens/edit/index';
import DetailScreen from '../screens/detail/index';

const CardNavigator = createStackNavigator(
  {
    Main: { screen: MainTabNavigator, 
      navigationOptions: {  
        headerStyle: {
          backgroundColor: '#FFF',
          height: 44,
        },
        header: null,
      }, 
    },
    Add: { screen: AddScreen },
    Edit: { screen: EditScreen },
    Detail: { screen: DetailScreen },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        color: '#333',
      },
      // Detail
      headerStyle: {
        backgroundColor: '#FFF',
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
        headerStyle: {
          backgroundColor: '#FFF',
          height: 44,
        },
      },
    },
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
