import React, { ChangeEvent } from 'react';
import { getApiUrl } from '../api';

interface IProps {
    postId: number;
    username: string;
    onNewCommentAdded: (id: number) => void;
}

interface IState {
    showError: boolean;
    content: string;
}

class NewComment extends React.Component<IProps, IState> {
    apiUrl: string;

    constructor(props: IProps) {
        super(props);

        this.state = {
            showError: false,
            content: ''
        };

        this.apiUrl = getApiUrl();

        this.onCommentContentChange = this.onCommentContentChange.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    onCommentContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            content: event.target.value,
            showError: false
        });
    }

    submitComment() {
        this.setState({
            showError: false
        });

        if (!this.state.content.trim()) {
            return;
        }

        const comment = {
            author: this.props.username || 'Guest',
            content: this.state.content
        };

        // TODO: move URLs
        const addCommentUrl = `${this.apiUrl}/add-comment/${this.props.postId}`;

        fetch(addCommentUrl, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': this.apiUrl,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok! ' + response.statusText);
                }

                this.setState({
                    content: ''
                });

                const jsonResponse = (await response.json()) as any;

                this.props.onNewCommentAdded(jsonResponse.id);
            }).catch((error) => {
                console.warn(error);

                this.setState({
                    showError: true
                });
            });
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <textarea className="inpt-1 w-100 mb-1" onChange={this.onCommentContentChange} value={this.state.content} />
                    </div>
                    <button className="btn-1" type="button" onClick={this.submitComment}>Submit Comment</button>
                </div>

                {this.state.showError && (
                    <div className="error-message">Something went wrong!</div>
                )}
            </div>
        );
    }
}

export default NewComment;
