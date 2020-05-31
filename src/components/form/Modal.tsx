/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import * as React from 'react';
import useBodyScroll from '../../hooks/useBodyScroll';
import useOnclickOutside from '../../hooks/useOnclickOutside';

interface Props {
  onToggle: () => void;
}

const Modal: React.FC<Props> = ({ onToggle }) => {
  const ref: React.MutableRefObject<HTMLDivElement | any> = React.useRef();
  useBodyScroll();
  useOnclickOutside(ref, onToggle);
  return (
    <div className="Modal" ref={ref}>
      <div className="contentModal">
        <h1>hello</h1>
        <p>Mohahaha You cant Scroll now!!!</p>
        <button
          type="button"

          onClick={onToggle}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Modal;
