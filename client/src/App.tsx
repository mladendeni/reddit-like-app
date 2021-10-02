import React, { Component } from 'react';
import './App.scss';
import NewPost from './Post/NewPost';
import Feed from './Feed/Feed';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faComment, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import Username from './Username/Username';

library.add(fab, faComment, faPencilAlt);

interface IProps {
}

interface IState {
  username: string;
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      username: ''
    };
  }

  updateUsername(newUsername: string) {
    this.setState({
      username: newUsername
    });
  }

  render() {
    return (
      <div className="main-app-wrapper">
        <div className="top-container">
          <Username updateUsername={this.updateUsername} />
          <NewPost />
        </div>
        <Feed />
      </div>
    );
  }
}

export default App;