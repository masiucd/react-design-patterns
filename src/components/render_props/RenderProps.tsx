import * as React from 'react';
import CountUi from './CountUi';

interface Props {

}

const RenderProps: React.FC<Props> = () => (
  <div className="RenderProps">
    <CountUi render={(count: number, increase: CountFn, decrease: CountFn) => (
      <div className="render-content">

        <h1 className="count">{count}</h1>
        <div className="btn-group">
          <button type="button" onClick={increase}>Increase</button>
          <button type="button" onClick={decrease} disabled={count === 0}>Decrease</button>
        </div>
      </div>
    )}
    />
  </div>
);
export default RenderProps;
