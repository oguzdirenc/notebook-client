import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AllLists from "./components/AllLists";
import "semantic-ui-css/semantic.min.css";
import TodoList from "./components/TodoList";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path="/allLists" component={AllLists} />
              <Route path="/todoList" component={TodoList} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
