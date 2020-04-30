/* eslint-disable import/extensions */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { navData } from '../../../utils/navData';
import { ThemeContext } from '../../../context/Theme';

interface Props {

}


const NavList: React.FC<Props> = () => {
  const { state } = React.useContext(ThemeContext);

  const theme = state.setTheme ? state.light : state.dark;
  return (
    <ul className="NavList">
      {navData.map((item) => (
        <li key={item.id} style={{ color: theme.hex }}>
          {' '}
          <Link
            style={{ color: theme.hex, background: theme.bg }}
            to={item.path}
          >
            {item.text}

          </Link>
          {' '}
        </li>
      ))}
    </ul>
  );
};
export default NavList;
