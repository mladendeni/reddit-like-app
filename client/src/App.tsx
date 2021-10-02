import React from 'react';
import './App.scss';
import NewPost from './Post/NewPost';
import Feed from './Feed/Feed';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faComment);

function App() {
  return (
    <div className="main-app-wrapper">
      <NewPost />
      <Feed />
    </div>
  );
}

export default App;
