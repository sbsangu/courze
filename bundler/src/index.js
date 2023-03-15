import { ColorModeScript,ChakraProvider } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux"
import store from "./redux/store.js"



const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
  <Provider store={store}>

  <ChakraProvider>  <ColorModeScript />
    <App /></ChakraProvider>
  </Provider>
   
  </StrictMode>
);

