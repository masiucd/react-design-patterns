import * as React from 'react';
import Title from '../components/layout/title/Title';

const Users = React.lazy(() => import('../components/lazy/Users'));
interface Props {

}

const Lazy: React.FC<Props> = () => (
  <>
    <div className="Container">
      <Title mainTitle="React Lazy" subTitle="Users" />
      <React.Suspense fallback={<h2>...Loading</h2>}>
        <Users />
      </React.Suspense>
    </div>

  </>
);
export default Lazy;
