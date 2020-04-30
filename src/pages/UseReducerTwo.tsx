/* eslint-disable import/extensions */
import * as React from 'react';

const ReducerTwo = React.lazy(() => import('../components/reducer_two/Reducer'));

interface Props {

}

const UseReducerPageTwo: React.FC<Props> = () => (
  <React.Suspense fallback={<h1>...Loading</h1>}>
    <div className="Container">
      {' '}
      <ReducerTwo />
      {' '}
    </div>
  </React.Suspense>
);
export default UseReducerPageTwo;
