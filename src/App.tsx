/* eslint-disable import/extensions */
import React from 'react';
import './App.css';
import Routes from './components/routes/Routes';
import Layout from './components/layout/Layout';
import ThemeProvider from './context/Theme';


function App() {
  return (
    <>
      <ThemeProvider>
        <Layout>
          <Routes />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
