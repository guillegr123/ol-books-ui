import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from '../../containers/Search';
import Work from '../../containers/Work';

const Main = props => (
  <Switch>
    <Route exact path="/" component={Search} />
    <Route path="/works/:olid" component={Work} />
  </Switch>
);

export default Main;