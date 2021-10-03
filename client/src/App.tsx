import React, { Component } from 'react';
import './App.scss';
import NewPost from './Post/NewPost';
import Feed from './Feed/Feed';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faComment, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import Username from './Username/Username';

library.add(fab, faComment, faPencilAlt, faPlus);

interface IProps {
}

interface IState {
  username: string;
  lastPostId: number;
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      username: '',
      lastPostId: 0
    };

    this.onNewPostAdded = this.onNewPostAdded.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  updateUsername(newUsername: string) {
    this.setState({
      username: newUsername
    });
  }

  onNewPostAdded(id: number) {
    this.setState({
      lastPostId: id
    });
  }

  render() {
    return (
      <div className="main-app-wrapper">
        <div className="top-container">
          <Username updateUsername={this.updateUsername} />
          <NewPost username={this.state.username} onNewPostAdded={this.onNewPostAdded} />
        </div>
        <Feed lastPostId={this.state.lastPostId} username={this.state.username} />
      </div>
    );
  }
}

export default App;