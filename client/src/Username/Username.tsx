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

        this.updateUsername = this.updateUsername.bind(this);
    }

    updateUsername(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            username: event.currentTarget.value
        });

        this.props.updateUsername(event.currentTarget.value);
    }

    render() {
        return (
            <div className="username-component generic-box">
                <div className="mb-1">Username:</div>
                <div className="username-input-wrapper">
                    <FontAwesomeIcon icon="pencil-alt" className="username-edit-icon" />
                    <input type="text" onChange={this.updateUsername} value={this.state.username} placeholder="Guest" className="username-input inpt-1" />
                </div>
            </div>
        );
    }
}

export default Username;
