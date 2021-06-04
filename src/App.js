import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <BrowserRouter>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route exact path="/">
                <Chat />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
