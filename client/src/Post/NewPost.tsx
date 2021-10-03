import React, { ChangeEvent, SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NewPost.scss';

interface IProps {
    username: string;
    onNewPostAdded: (id: number) => void;
}

interface IState {
    showForm: boolean;
    showError: boolean;
    content: string;
}

class NewPost extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            showForm: false,
            showError: false,
            content: ''
        };

        this.toggleAddNewPostForm = this.toggleAddNewPostForm.bind(this);
        this.onPostContentChange = this.onPostContentChange.bind(this);
        this.submitPost = this.submitPost.bind(this);
        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.onFormClick = this.onFormClick.bind(this);
    }

    toggleAddNewPostForm() {
        this.setState({
            showForm: !this.state.showForm
        });
    }

    onPostContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            content: event.target.value,
            showError: false
        });
    }

    submitPost() {
        this.setState({
            showError: false
        });

        if (!this.state.content.trim()) {
            return;
        }

        const post = {
            author: this.props.username || 'Guest',
            content: this.state.content
        };

        // TODO: move URLs
        const addPostUrl = 'http://localhost:3001/add-post';

        fetch(addPostUrl, {
            // mode: 'no-cors',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok! ' + response.statusText);
                }

                this.setState({
                    showForm: false,
                    content: ''
                });

                const jsonResponse = (await response.json()) as any;

                this.props.onNewPostAdded(jsonResponse.id);
            }).catch((error) => {
                console.warn(error);

                this.setState({
                    showError: true
                });
            });
    }

    onOverlayClick() {
        this.setState({
            showForm: false,
            showError: false
        });
    }

    onFormClick(e: SyntheticEvent) {
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        return (
            <div className="new-post-wrapper">
                <div>
                    <button type="button" onClick={this.toggleAddNewPostForm} className="add-new-post-toggle-button btn-1">
                        <FontAwesomeIcon icon="plus" className="add-new-post-toggle-button-icon" />
                        <span>Add New Post</span>
                    </button>
                </div>
                {this.state.showForm && (
                    <>
                        <div className="overlay-item" onClick={this.onOverlayClick}></div>
                        <div className="new-post-form generic-box" onClick={this.onFormClick}>
                            <div>
                                <textarea className="new-post-textarea inpt-1 mb-3" onChange={this.onPostContentChange} value={this.state.content} />
                                <button className="new-post-button btn-1" type="button" onClick={this.submitPost}>Submit Post</button>
                            </div>

                            {this.state.showError && (
                                <div className="error-message">Something went wrong!</div>
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default NewPost;
