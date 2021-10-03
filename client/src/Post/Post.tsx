import React, { useState } from 'react';
import { timeDifference } from '../Helpers/helper';
import { PostType } from '../Feed/Feed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comments from '../Comment/Comments';

export default function Post(props: { post: PostType, username: string }) {
    const [areCommentsShown, updateAreCommentsShown] = useState(false);

    return (
        <div className="post-item generic-box mb-3">
            <div className="post-info mb-3">Posted by {props.post.author} {timeDifference(props.post.createdOn)}</div>
            <div className="post-content mb-1">{props.post.content}</div>
            <div className="post-comments-count">
                <button type="button" className="toggle-comments-button" onClick={() => { updateAreCommentsShown(!areCommentsShown); }}>
                    <span className="post-comments-icon">
                        <FontAwesomeIcon icon="comment" />
                    </span>
                    <span>{props.post.commentsCount} comments</span> {/* TODO: This may not be always the actual comments count */}
                </button>
            </div>
            {areCommentsShown && (
                <Comments postId={props.post.id} username={props.username} />
            )}
        </div>
    );
}