import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Holdings } from "./screens/Holdings/Holdings";
import Login from "./screens/Login/Login";
import Map from "./screens/Map/Map";

const toggle = () => {};
const logout = () => {};

export const App = () => {
  return (
    <Router>
      <div color="primary" className="mat-elevation-z4">
        <span>
          <button onClick={() => toggle()}>menu</button>
          <span className="logo">
            <img src="assets/logo.png" alt="Logo" />
          </span>
        </span>
        <span className="spacer"></span>
        <button className="login" onClick={() => logout()}>
          person
        </button>
      </div>
      <div id="side-nav-container">
        <div id="side-nav" mode="over" className="app-sidenav">
          <nav>
            <Link to="/">
              <p>Login</p>
            </Link>
            <Link to="/commands">
              <p>commands</p>
            </Link>
            <Link to="/holdings">
              <p>holdings</p>
            </Link>
            <Link to="/map">
              <p>map</p>
            </Link>
            <div className="container">
              <Switch>
                <Route path="/commands"></Route>
                <Route path="/holdings">
                  <Holdings />
                </Route>
                <Route path="/map">
                  <Map />
                </Route>
                <Route path="/">
                  <Login />
                </Route>
              </Switch>
            </div>
          </nav>
        </div>
      </div>
    </Router>
  );
};
