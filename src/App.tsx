import React, { Suspense, lazy } from 'react';
import './App.css';

const Hello = lazy(() => import('./Hello'));

function App() {
  return (
    <div className="App">
      <h1>Let's play with react Lazy</h1>
      <Suspense fallback={<h3>...Loading</h3>}>
        <Hello />
      </Suspense>
    </div>
  );
}

export default App;
