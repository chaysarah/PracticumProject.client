import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './actions/subscribedSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export default store;