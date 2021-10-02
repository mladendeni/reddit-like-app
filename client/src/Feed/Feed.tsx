import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { timeDifference } from '../Helpers/helper';
import './Feed.scss';

type Post = {
    author: string;
    createdOn: number;
    content: string;
    comments: any[];
}

interface IProps {
}

interface IState {
    posts: Post[]
}

class Feed extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            posts: []
        };
    }

    getPosts() {
        const postsUrl = 'http://localhost:3001/posts';

        fetch(postsUrl, {
            // mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    posts: result.posts
                });
            }).catch((error) => {
                console.warn(error);
            });
    }

    componentDidMount() {
        this.getPosts();
    }

    render() {
        return (
            <div className="posts-list-wrapper">
                <h1 className="posts-list-title">Newest posts</h1>
                <div>
                    {
                        this.state.posts.map((post, index) => {
                            return (
                                <div key={index} className="post-item generic-box">
                                    <div className="post-info">Posted by {post.author} {timeDifference(post.createdOn)}</div>
                                    <div className="post-content">{post.content}</div>
                                    <div className="post-comments-count">
                                        <button type="button" className="toggle-comments-button">
                                            <span className="post-comments-icon">
                                                <FontAwesomeIcon icon="comment" />
                                            </span>
                                            <span>{post.comments.length} comments</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Feed;
