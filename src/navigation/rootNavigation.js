import React from 'react';
import { BackHandler } from 'react-native';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import AppNavigator from './appNavigator';

const App = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = (state) => {
  // stateにはapp.user, navがあるが、Navigationではnav以外うけつけない
  // console.log(state)
  return {state: state.nav}
};

const ConnectedApp = connect(mapStateToProps)(App);

const mergeProps = (state, dispatch, ownProps) => {
  // mergePropsのstateはmapStateToPropsとは異なりアクション
  // console.log(state)//actions
  // console.log(ownProps)// undefined
  // console.log(store.getState().user)//null
  return ({
      ...ownProps,
      screenProps: {
        ...state,
        ...dispatch,
      },
  })
}

// const AppWithNavigationState = connect(mapStateToProps)(App);

// const Test = connect(
//   state => ({ ...state }),
//   dispatch => ({
//     actions: bindActionCreators({
//       ...AppActions,
//     }, dispatch),
//   }),
// )(AppWithNavigationState)

export default class AppWithNavigationState extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { nav, dispatch } = this.props;
    // if (nav.routes[nav.index].index === 0) {
    //   return false;
    // }

    // dispatch(NavigationActions.back());

    return true;
  };

  render() {
    const { nav, dispatch } = this.props;
    return <ConnectedApp dispatch={dispatch} state={nav} />;
  }
}

