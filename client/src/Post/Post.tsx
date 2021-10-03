import React, { useState } from 'react';
import { timeDifference } from '../Helpers/helper';
import { PostType } from '../Feed/Feed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comments from '../Comment/Comments';

export default function Post(props: { post: PostType }) {
    const [areCommentsShown, updateAreCommentsShown] = useState(false);

    return (
        <div className="post-item generic-box">
            <div className="post-info">Posted by {props.post.author} {timeDifference(props.post.createdOn)}</div>
            <div className="post-content">{props.post.content}</div>
            <div className="post-comments-count">
                <button type="button" className="toggle-comments-button" onClick={() => { updateAreCommentsShown(!areCommentsShown); }}>
                    <span className="post-comments-icon">
                        <FontAwesomeIcon icon="comment" />
                    </span>
                    <span>{props.post.commentsCount} comments</span>
                </button>
            </div>
            {areCommentsShown && (
                <Comments postId={props.post.id} />
            )}
        </div>
    );
}