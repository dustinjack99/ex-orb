import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./screens/Login/Login";
import Map from "./screens/Map/Map";

const toggle = () => {};
const logout = () => {};

export const App = () => {
  return (
    <>
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
            <Router>
              <Link to="/">
                <p>/</p>
              </Link>
              <Link to="/commands">
                <p>/commands</p>
              </Link>
              <Link to="/holdings">
                <p>/holdings</p>
              </Link>
              <Link to="/map">
                <p>/map</p>
              </Link>
              <div className="container">
                <Switch>
                  <Route path="/">
                    <Map />
                  </Route>
                  <Route path="/commands"></Route>
                  <Route path="/holdings"></Route>
                  <Route path="/map">
                    <Login />
                  </Route>
                </Switch>
              </div>
            </Router>
          </nav>
        </div>
      </div>
    </>
  );
};
