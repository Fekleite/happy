import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import OrphanagesMap from "./pages/OrphanagesMap/OrphanagesMap";

function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Landing} exact/>
        <Route path="/app" component={OrphanagesMap} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;