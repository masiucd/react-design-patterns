/* eslint-disable import/extensions */
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Lazy from '../../pages/Lazy';
import RenderPropsPage from '../../pages/RenderProps';
import UseReducerPage from '../../pages/UseReducerPage';


interface Props {

}

const Routes: React.FC<Props> = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/lazy" component={Lazy} />
      <Route exact path="/renderprops" component={RenderPropsPage} />
      <Route exact path="/usereducer" component={UseReducerPage} />
    </Switch>
  </>
);
export default Routes;
