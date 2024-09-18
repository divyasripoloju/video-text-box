import { configureStore } from '@reduxjs/toolkit';
import textReducer from './textSlice'; // Your reducer

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    text: textReducer,
  },
});

// Export the store as default
export default store;
