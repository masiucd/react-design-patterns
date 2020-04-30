/* eslint-disable import/extensions */
import * as React from 'react';

const ReducerExample = React.lazy(() => import('../components/reducer/Reducer'));

interface Props {

}

const UseReducerPage: React.FC<Props> = () => (
  <React.Suspense fallback={<h1>...Loading</h1>}>
    <div className="Container">
      <ReducerExample />
    </div>
  </React.Suspense>
);
export default UseReducerPage;
