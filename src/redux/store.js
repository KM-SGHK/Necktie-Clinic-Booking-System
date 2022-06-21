import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import clientNameReducer from "./client_information/reducer";
import doctorDataReducer from "./doctor_information/reducer";
import bookingReducer from "./booking/reducer";

const root_reducer = combineReducers({
  clientName: clientNameReducer,
  doctorData: doctorDataReducer,
  bookingData: bookingReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  root_reducer,
  composeEnhancers(applyMiddleware(thunk))
);
