/* eslint-disable import/extensions */
import * as React from 'react';
import NavList from './NavList';

interface Props {

}

const Navbar: React.FC<Props> = () => (
  <nav id="Navbar">
    <NavList />
  </nav>
);
export default Navbar;
