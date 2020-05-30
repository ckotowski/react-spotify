import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './reducers';
import sound from './features/sound/soundSlice';
import token from './features/token/tokenSlice';
import ui from './features/ui/uiSlice';
import App from './App';

//create the redux store
const store = configureStore({
  reducer: {
    ...reducer,
    sound,
    token,
    ui,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
