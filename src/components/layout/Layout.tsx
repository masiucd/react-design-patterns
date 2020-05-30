/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import * as React from 'react';
import Navbar from './navbar/Navbar';
import { ThemeContext } from '../../context/Theme';


interface MyStorage extends Storage {
  getItem(key: string): any;
}
interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  const { state } = React.useContext(ThemeContext);
  const theme = state.setTheme ? state.light : state.dark;

  // console.log(state, dispatch);

  React.useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(state));
    const getThemeStorage: any = localStorage.getItem('theme');
    const themeStorage: any = JSON.parse(getThemeStorage);

    document.body.style.background = theme.bg;
    document.body.style.color = theme.hex;
    // if (state.dark) {
    // }
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
