import React from 'react';
import { timeDifference } from '../Helpers/helper';
import { CommentType } from '../Comment/Comments';

export default function Comment(props: { comment: CommentType }) {
    return (
        <div className="post-item generic-box">
            <div className="post-info">Commented by {props.comment.author} {timeDifference(props.comment.createdOn)}</div>
            <div className="post-content">{props.comment.content}</div>
        </div>
    );
}