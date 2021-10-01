import React from 'react';
import './App.scss';
import NewThread from './Feed/NewThread';
import Feed from './Feed/Feed';

function App() {
  return (
    <div>
      <NewThread />
      <Feed />
    </div>
  );
}

export default App;
