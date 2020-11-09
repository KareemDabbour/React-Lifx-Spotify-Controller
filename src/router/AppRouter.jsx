import React from "react";
import Home from "../components/Home/index";
import RedirectPage from "../components/RedirectPage";
import Dashboard from "../components/Dashboard/index";
import NotFoundPage from "../components/NotFoundPage";
import Lifx from "../components/Lifx-Login/index";
import RedirectLifx from "../components/RedirectPageLifx";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/redirect" component={RedirectPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login-lifx" component={Lifx} />
          <Route path="/redirect-lifx" component={RedirectLifx} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
