import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AllLists from "./components/AllLists";
import "semantic-ui-css/semantic.min.css";
import TodoList from "./components/TodoList";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./components/Login";
import SecureRoute from "./securityUtils/SecureRoute";
import Navbar from "./components/Navbar";
import setJWTToken from "./securityUtils/setJWTToken";
import { login } from "./redux/actions/securityActions";
import Register from "./components/Register";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decodedToken = jwt_decode(jwtToken);
  store.dispatch(login(decodedToken));
}

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <div>
                  <Navbar />
                  <SecureRoute path="/allList" component={AllLists} />
                  <SecureRoute path="/todoList" component={TodoList} />
                </div>
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
