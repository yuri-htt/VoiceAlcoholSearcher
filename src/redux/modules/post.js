const initialState = {};
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_POST':
      return {
        data: payload,
      };
    case 'UPDATE_POST':
      return {
          data: payload.post,
      }
    default:
      return state;
  }
};
