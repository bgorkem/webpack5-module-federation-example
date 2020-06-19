import React, { useState } from 'react';
import RemoteReactComponent from './ReactRemoteComponent';

const RemoteButton = React.lazy(() => import('lib1/Button'));

const App = () => {
  const [shown, setShown] = useState(false);
  return (
    <div>
      <h1>Shell</h1>
      <button
        onClick={() => {
          setShown(true);
        }}
      >
        Load Button from Lib
      </button>
      {shown && (
        <section style={{ marginTop: 10, backgroundColor: 'orange', border: '1', padding: 20, width: '50vw' }}>
          <RemoteReactComponent url="http://localhost:3002/remoteEntry.js" module="Button" scope="lib1" />
        </section>
      )}
    </div>
  );
};

export default App;
