import React from 'react';
import { timeDifference } from '../Helpers/helper';
import { PostType } from '../Feed/Feed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Post(props: { post: PostType }) {
    return (
        <div className="post-item generic-box">
            <div className="post-info">Posted by {props.post.author} {timeDifference(props.post.createdOn)}</div>
            <div className="post-content">{props.post.content}</div>
            <div className="post-comments-count">
                <button type="button" className="toggle-comments-button">
                    <span className="post-comments-icon">
                        <FontAwesomeIcon icon="comment" />
                    </span>
                    <span>{props.post.comments.length} comments</span>
                </button>
            </div>
        </div>
    );
}