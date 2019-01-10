const initialState = {
  data: [],
};
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_POSTS':
      return {
        data: payload,
      };
    default:
      return state;
  }
};
