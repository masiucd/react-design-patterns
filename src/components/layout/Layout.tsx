import * as React from 'react';
import Navbar from './navbar/Navbar';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => (
  <>
    <Navbar />
    <div className="App">
      {props.children}
    </div>
  </>
);
export default Layout;
