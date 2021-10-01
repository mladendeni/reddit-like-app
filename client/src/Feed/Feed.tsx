import React, { Component } from 'react';

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

    render() {
        return (
            <div className="posts-list">
                {
                    this.state.posts.map((post, index) => {
                        return (
                            <div key={index} className="post-item">
                                <div>Posted by {post.author} on {this.convertDate(post.createdOn)}</div>
                                <div>{post.content}</div>
                                <div>{post.comments.length} comments</div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Feed;
