const initialState = {
  clientName: "",
};

const clientNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_CLIENT_NAME":
      return { ...state, clientName: action.payload };
    case "CLEAR_CLIENT_NAME":
      return { ...state, clientName: "" };
    default:
      return state;
  }
};

export default clientNameReducer;
