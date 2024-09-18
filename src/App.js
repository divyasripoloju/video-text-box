import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Default import of store
import Home from './Components/Home';


const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
