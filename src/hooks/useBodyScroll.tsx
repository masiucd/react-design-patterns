/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
import { useLayoutEffect } from 'react';

export default () => {
  useLayoutEffect((): any => {
    // const originalStyle = document.body.style.overflow = 'hidden';
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = originalStyle;
  }, []);
};
