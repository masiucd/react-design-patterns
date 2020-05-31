import * as React from 'react';
import useBodyScroll from '../../hooks/useBodyScroll';

interface Props {
  onToggle: () => void;
}

const Modal: React.FC<Props> = ({ onToggle }) => {
  useBodyScroll();
  return (
    <div className="Modal">
      <div className="contentModal">
        <h1>hello</h1>
        <p>Mohahaha You cant Scroll now!!!</p>
        <button type="button" onClick={onToggle}>
          Close
        </button>
      </div>
    </div>
  );
};
export default Modal;
