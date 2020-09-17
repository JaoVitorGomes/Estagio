import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Instrucoes from '../pages/Instrucoes';
import Register from '../pages/aluno/register-aluno';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Instrucoes} />
    <Route path="/admin" exact component={Dashboard} />
    <Route path="/register" exact component={Register} />
  </Switch>
);

export default Routes;
