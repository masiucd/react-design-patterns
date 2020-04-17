/* eslint-disable import/extensions */
import * as React from 'react';
import RenderProps from '../components/render_props/RenderProps';

interface Props {

}

const RenderPropsPage: React.FC<Props> = () => (
  <div className="Container">
    <RenderProps />
  </div>
);
export default RenderPropsPage;
