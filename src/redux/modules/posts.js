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
    case 'ADD_POST':
      let newData = state.data
      newData.unshift(payload.newPost);
      return {
        data: newData,
      }
    default:
      return state;
  }
};
