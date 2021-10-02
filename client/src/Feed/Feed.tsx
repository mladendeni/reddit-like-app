import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
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

    convertDate(timestamp?: number) {
        if (!timestamp) {
            return;
        }

        const date = new Date(timestamp);

        return date.toDateString();
    }

    // https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time
    timeDifference(previous: number) {
        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30;
        const msPerYear = msPerDay * 365;

        const elapsed = Date.now() - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }
        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }
        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' days ago';
        }
        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        }
        else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
    }

    render() {
        return (
            <div className="posts-list-wrapper">
                <h1 className="posts-list-title">Newest posts</h1>
                <div>
                    {
                        this.state.posts.map((post, index) => {
                            return (
                                <div key={index} className="post-item">
                                    <div className="post-info">Posted by {post.author} {this.timeDifference(post.createdOn)}</div>
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
