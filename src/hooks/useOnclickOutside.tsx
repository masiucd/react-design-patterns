/* eslint-disable no-undef */
import { useEffect } from 'react';

export default (ref: React.MutableRefObject<HTMLDivElement | any>, handler: () => void) => {
  useEffect(() => {
    function listener(event: Event) {
      if (!ref.current || ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);


    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);
};
