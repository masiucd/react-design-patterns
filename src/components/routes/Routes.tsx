/* eslint-disable import/extensions */
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home';

const Users = React.lazy(() => import('../lazy/Users'));


interface Props {

}

const Routes: React.FC<Props> = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <React.Suspense fallback={<h3>...loading</h3>}>
        <Route exact path="/lazy" component={Users} />
      </React.Suspense>
    </Switch>
  </>
);
export default Routes;
