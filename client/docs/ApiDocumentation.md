# Reddit Like App API Documentation


## Endpoints



### /posts
_GET_

**Returns** all available posts. They are sorted by date in descending order.

--------------------------------

### /add-post
_POST_

**Params**
```json
{
    content: string;
    author: string;
}
```

**Returns** the ID of the newly added post.

**Rejects** if any of the params is missing.

--------------------------------

### /comments/:postId
_GET_

**URL Params** postId must be an integer

**Returns** all comments for a post. They are sorted by date in ascending order.

--------------------------------

### /add-comment/:postId
_POST_

**URL Params** postId must be an integer

**Params**
```json
{
    content: string;
    author: string;
}
```

**Returns** the ID of the newly added comment.

**Rejects** if any of the params is missing.
