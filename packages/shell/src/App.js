import React, { useState } from 'react';

const RemoteButton = React.lazy(() => import('lib1/Button'));

const App = () => {
  const [shown, setShown] = useState(false);
  return (
    <div>
      <h1>Shell is here</h1>
      <h2>Lib 1 Button below</h2>
      <button
        onClick={() => {
          setShown(true);
        }}
      >
        Show Button
      </button>
      {shown && (
        <React.Suspense fallback="Loading Button">
          <RemoteButton />
        </React.Suspense>
      )}
    </div>
  );
};

export default App;
