const initialState = null;

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USER':
      return {
        uid: payload.uid,
      };
    default:
      return state;
  }
};
