const initialState = {
  doctors: [],
};

const doctorDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_DOCTOR_DATA":
      return { ...state, doctors: action.payload };
    case "CLEAR_DOCTOR_DATA":
      return { ...state, doctors: [] };
    default:
      return state;
  }
};

export default doctorDataReducer;
