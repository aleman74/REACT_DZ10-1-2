import React from "react";
import { Provider } from 'react-redux';
import './App.css';
import Work from "./components/Work";
import Work2 from "./components/Work2";
import appStore from './store/store';


function App() {
  return (
    <Provider store={appStore}>
      <Work2 />
    </Provider>
  );
}

export default App;
