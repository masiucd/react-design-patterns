/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import * as React from 'react';
import Navbar from './navbar/Navbar';
import { ThemeContext } from '../../context/Theme';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  const { state } = React.useContext(ThemeContext);
  const theme = state.setTheme ? state.light : state.dark;
  React.useEffect(() => {
    document.body.style.background = theme.bg;
  }, [theme]);


  return (
    <>
      <Navbar />
      <div className="App">
        {props.children}
      </div>
    </>
  );
};
export default Layout;
