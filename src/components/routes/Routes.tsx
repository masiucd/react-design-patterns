/* eslint-disable import/extensions */
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import UseMemoPage from '../../pages/UseMemoPage';

const Home = React.lazy(() => import('../../pages/Home'));
const Lazy = React.lazy(() => import('../../pages/Lazy'));
const RenderPropsPage = React.lazy(() => import('../../pages/RenderProps'));
const UseReducerPage = React.lazy(() => import('../../pages/UseReducerPage'));
const UseReducerPageTwo = React.lazy(() => import('../../pages/UseReducerTwo'));
// const UseMemoPage = React.lazy(() => import('../../pages/UseMemoPage'));

interface Props {

}

const Routes: React.FC<Props> = () => (
  <>
    <React.Suspense fallback={<h2>...loading</h2>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/lazy" component={Lazy} />
        <Route exact path="/renderprops" component={RenderPropsPage} />
        <Route exact path="/usereducer" component={UseReducerPage} />
        <Route exact path="/usereducertwo" component={UseReducerPageTwo} />
        <Route exact path="/usememo" component={UseMemoPage} />
      </Switch>
    </React.Suspense>
  </>
);
export default Routes;
