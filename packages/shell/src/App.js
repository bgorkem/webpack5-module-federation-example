import React from 'react';

const RemoteButton = React.lazy(() => import('lib1/Button'));

const App = () => (
  <div>
    <h1>Shell is here</h1>
    <h2>Lib 1 Button below</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
  </div>
);

export default App;
