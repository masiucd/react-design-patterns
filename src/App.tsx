/* eslint-disable import/extensions */
import React from 'react';
import './App.css';
import Routes from './components/routes/Routes';
import Layout from './components/layout/Layout';


function App() {
  return (
    <>
      <Layout>
        <Routes />
      </Layout>
    </>
  );
}

export default App;
