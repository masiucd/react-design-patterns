import * as React from 'react';

const Users = React.lazy(() => import('../components/lazy/Users'));
interface Props {

}

const Lazy: React.FC<Props> = () => (
  <>
    <div className="Container">
      <React.Suspense fallback={<h2>...Loading</h2>}>
        <Users />
      </React.Suspense>
    </div>

  </>
);
export default Lazy;
