/* eslint-disable import/extensions */
import * as React from 'react';
import useToggle from '../../hooks/useToggle';

import './style.css';
import Modal from './Modal';

interface Props {

}

const Toggle: React.FC<Props> = () => {
  const [on, toggle] = useToggle();
  return (
    <div className="Toggle">

      <h1> Toggle </h1>
      <button type="button" id="ToggleMainBtn" onClick={toggle}>Toggle</button>
      {on && <Modal onToggle={toggle} />}
    </div>
  );
};
export default Toggle;
