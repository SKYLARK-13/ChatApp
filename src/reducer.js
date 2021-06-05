export const initialState = {
  user: null,
  clickedUid: "",
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_CLICKED: "SET_CLICKED",
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_CLICKED:
      return {
        ...state,
        clickedUid: action.clickedUid,
      };

    default:
      return state;
  }
};

export default reducer;
