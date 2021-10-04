import React from 'react';
import Comment from './Comment';
import NewComment from './NewComment';
import { getApiUrl } from '../api';

export type CommentType = {
    id: number;
    author: string;
    createdOn: number;
    content: string;
}

interface IProps {
    postId: number;
    username: string;
    onNewCommentAdded: (commentsCount: number) => void;
}

interface IState {
    comments: CommentType[]
}

class Comments extends React.Component<IProps, IState> {
    apiUrl: string;

    constructor(props: IProps) {
        super(props);

        this.state = {
            comments: []
        };

        this.apiUrl = getApiUrl();

        this.onNewCommentAdded = this.onNewCommentAdded.bind(this);
    }

    getComments() {
        const postsUrl = `${this.apiUrl}/comments/${this.props.postId}`;

        return fetch(postsUrl, {
            headers: {
                'Access-Control-Allow-Origin': this.apiUrl
            }
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    comments: result.comments
                });
            }).catch((error) => {
                console.warn(error);
            });
    }

    async onNewCommentAdded() {
        await this.getComments();

        this.props.onNewCommentAdded(this.state.comments.length);
    }

    componentDidMount() {
        this.getComments();
    }

    render() {
        return (
            <>
                <div className="generic-box mb-3">
                    <div className="posts-list-title mb-1">Add new Comment</div>
                    <NewComment postId={this.props.postId} username={this.props.username} onNewCommentAdded={this.onNewCommentAdded} />
                </div>

                <div className="posts-list-title mb-1">Comments</div>

                {this.state.comments.length > 0 && (
                    <div>
                        {this.state.comments.map((comment, index) => <Comment comment={comment} key={index} />)}
                    </div>
                )}
                {this.state.comments.length <= 0 && (
                    <div>No comments yet</div>
                )}
            </>
        );
    }
}

export default Comments;
