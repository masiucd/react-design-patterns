import * as React from 'react';
import MemoExp from '../components/memo/MemoExp';

interface Props {

}

const UseMemoPage: React.FC<Props> = () => (
  <div className="container">
    <div className="UseMemoPage">
      <MemoExp />
    </div>
  </div>
);
export default UseMemoPage;
