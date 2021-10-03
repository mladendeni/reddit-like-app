import React, { Component } from 'react';
import Post from '../Post/Post';
import './Feed.scss';

export type PostType = {
    author: string;
    createdOn: number;
    content: string;
    comments: any[];
}

interface IProps {
    lastPostId: number
}

interface IState {
    posts: PostType[]
}

class Feed extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            posts: []
        };
    }

    getPosts() {
        // TODO: move URLs
        const postsUrl = 'http://localhost:3001/posts';

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
                        this.state.posts.map((post, index) => <Post post={post} key={index} />)
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
