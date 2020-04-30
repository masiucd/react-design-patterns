/* eslint-disable import/extensions */
import * as React from 'react';
import NavList from './NavList';
import { ThemeContext } from '../../../context/Theme';

interface Props {

}

const Navbar: React.FC<Props> = () => {
  const { state, dispatch } = React.useContext(ThemeContext);
  console.log(state, dispatch);
  return (
    <nav id="Navbar">
      <div id="toggle-theme">
        <span role="img" aria-label="sun"> ☀️ </span>
      </div>
      <NavList />
    </nav>
  );
};
export default Navbar;
