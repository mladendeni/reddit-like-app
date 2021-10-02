import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import './Username.scss';

interface IProps {
    updateUsername: (username: string) => void;
}

interface IState {
    username: string;
}

class Username extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            username: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
    }

    handleUsernameChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            username: event.currentTarget.value
        });
    }

    updateUsername() {
        this.props.updateUsername(this.state.username);
    }

    render() {
        return (
            <div className="header-component username-component">
                <div className="generic-box">
                    <div className="username-title">Username:</div>
                    <div className="username-input-wrapper">
                        <FontAwesomeIcon icon="pencil-alt" className="username-edit-icon" />
                        <input type="text" onChange={this.handleUsernameChange} value={this.state.username} placeholder="Guest" className="username-input" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Username;
