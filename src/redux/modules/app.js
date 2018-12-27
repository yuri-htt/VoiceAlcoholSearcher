import store from 'react-native-simple-store';

const LAUNCH = 'teamhub/app/LAUNCH';
const LAUNCH_SUCCESS = 'teamhub/app/LAUNCH_SUCCESS';
const LAUNCH_FAIL = 'teamhub/app/LAUNCH_FAIL';
const SET_LAUNCHED = 'teamhub/app/SET_LAUNCHED';

const initialState = {
  launching: false,
  launched: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LAUNCH:
      return {
        ...state,
        launching: true,
        error: undefined,
      };
    case LAUNCH_SUCCESS:
      return {
        ...state,
        launching: false,
        launched: action.launched,
        error: undefined,
      };
    case LAUNCH_FAIL:
      return {
        ...state,
        launching: false,
        launched: false,
        error: action.error,
      };
    case SET_LAUNCHED:
      return {
        ...state,
        launched: action.launched,
        error: undefined,
      };
    default:
      return state;
  }
}

function requestApp() {
  return {
    type: LAUNCH,
  };
}

function receiveApp(app) {
  return {
    type: LAUNCH_SUCCESS,
    launched: app ? app.launched : false,
  };
}

function receiveAppFail(error) {
  return {
    type: LAUNCH_FAIL,
    error,
  };
}

export function setLaunchedApp() {
  store.save('launchApp', {
    launched: true,
  });

  return {
    type: SET_LAUNCHED,
    launched: true,
  };
}