/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/extensions */
import * as React from 'react';
import NavList from './NavList';
import { ThemeContext } from '../../../context/Theme';

interface Props {

}

const Navbar: React.FC<Props> = () => {
  const { state, dispatch } = React.useContext(ThemeContext);

  const theme = state.setTheme ? state.light : state.dark;
  return (
    <nav id="Navbar" style={{ background: theme.bg, padding: '6rem 0' }}>
      <div id="toggle-theme">
        <span
          role="img"
          aria-label="sun"
          onClick={() => {
            dispatch({
              type: 'TOGGLE_THEME',
            });
          }}
        >
          {' '}
          ☀️
          {' '}

        </span>
      </div>
      <NavList />
    </nav>
  );
};
export default Navbar;
