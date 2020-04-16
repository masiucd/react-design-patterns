import * as React from 'react';
import { Link } from 'react-router-dom';
import { navData } from '../../../utils/navData';

interface Props {

}

const NavList: React.FC<Props> = () => (
  <ul className="NavList">
    {navData.map((item) => (
      <li key={item.id}>
        {' '}
        <Link to={item.path}>{item.text}</Link>
        {' '}
      </li>
    ))}
  </ul>
);
export default NavList;
