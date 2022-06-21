const initialState = {
  bookings: [],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BOOKING":
      return { ...state, bookings: action.payload };
    case "CREATE_BOOKING":
      return { ...state, bookings: [...state.bookings, action.payload] };
    case "CANCEL_BOOKING":
      return { ...state, bookings: [...state.bookings.map((booking) => {
        if (booking.id === action.payload.id) {
          return action.payload
        }
        return booking
      })] };
    default:
      return state;
  }
};

export default bookingReducer;
