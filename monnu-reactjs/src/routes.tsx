import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={MainRoutes} />
    </Switch>
  </BrowserRouter>
);

const MainRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" exact component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
