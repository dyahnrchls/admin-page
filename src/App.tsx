import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import User from "./pages/user/User";

function App() {

  return (
    <Provider store={store}>
      <User/>
    </Provider>
  );
}

export default App;
