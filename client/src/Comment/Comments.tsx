import React from 'react';
import Comment from './Comment';

export type CommentType = {
    id: number;
    author: string;
    createdOn: number;
    content: string;
}

interface IProps {
    postId: number
}

interface IState {
    comments: CommentType[]
}

class Comments extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            comments: []
        };
    }

    getComments() {
        // TODO: move URLs
        const postsUrl = `http://localhost:3001/comments/${this.props.postId}`;

        fetch(postsUrl, {
            // TODO: fix headers
            // mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
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

    componentDidMount() {
        this.getComments();
    }

    render() {
        return (
            <>
                <div className="posts-list-title username-title">Comments</div>

                {/* <div>Add new Comment</div> */}

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
