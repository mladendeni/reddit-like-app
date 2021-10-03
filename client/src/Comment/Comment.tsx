import React from 'react';
import { timeDifference } from '../Helpers/helper';
import { CommentType } from '../Comment/Comments';

export default function Comment(props: { comment: CommentType }) {
    return (
        <div className="post-item generic-box mb-1">
            <div className="post-info">
                <span>{props.comment.author}</span>
                <span> · </span>
                <span>{timeDifference(props.comment.createdOn, true)}</span>
            </div>
            <div className="post-content">{props.comment.content}</div>
        </div>
    );
}