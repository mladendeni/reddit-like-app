import React, { Component } from 'react';
import Post from '../Post/Post';
import { getApiUrl } from '../api';
import './Feed.scss';

export type PostType = {
    id: number;
    author: string;
    createdOn: number;
    content: string;
    commentsCount: number;
}

interface IProps {
    lastPostId: number;
    username: string;
}

interface IState {
    posts: PostType[];
}

class Feed extends Component<IProps, IState> {
    apiUrl: string;

    constructor(props: IProps) {
        super(props);

        this.state = {
            posts: []
        };

        this.apiUrl = getApiUrl();
    }

    getPosts() {
        const postsUrl = `${this.apiUrl}/posts`;

        fetch(postsUrl, {
            headers: {
                'Access-Control-Allow-Origin': this.apiUrl
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

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.lastPostId !== this.props.lastPostId) {
            this.getPosts();
        }
    }

    render() {
        return (
            <div className="posts-list-wrapper">
                <h1 className="posts-list-title">Newest posts</h1>
                <div>
                    {
                        this.state.posts.map((post, index) => <Post key={index} post={post} username={this.props.username} />)
                    }
                    {
                        this.state.posts.length === 0 && (
                            <h3>No posts yet!</h3>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Feed;
