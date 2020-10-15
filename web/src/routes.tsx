import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import OrphanagesMap from "./pages/OrphanagesMap/OrphanagesMap";
import Orphanage from "./pages/Orphanage/Orphanage";
import CreateOrphanage from "./pages/CreateOrphanage/CreateOrphanage";

function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Landing} exact/>
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;