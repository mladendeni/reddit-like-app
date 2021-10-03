const postEntities = [
    {
        id: 3,
        author: 'Mladen',
        createdOn: 1633160531499,
        content: 'Hello. This is my third post here.',
        commentsCount: 0
    },
    {
        id: 2,
        author: 'Mladen',
        createdOn: 1632560531499,
        content: 'What are your thoughts on the new Diablo 2 Resurrected?!',
        commentsCount: 0
    },
    {
        id: 1,
        author: 'mr_new_driver',
        createdOn: 1632070515993,
        content: 'Should you use an indicator when entering a roundabout in Bulgaria and which one if "yes"?',
        commentsCount: 0
    }
];

const commentEntities = [
    {
        id: 1,
        postId: 1,
        author: 'pro_driver',
        createdOn: 1632070555993,
        content: 'The right one'
    }
];

exports.getPostById = (postId) => {
    const postResult = postEntities.find((post) => {
        return post.id === postId;
    });

    return postResult;
};

exports.getPostsWithCommentsCount = () => {
    postEntities.forEach((post) => {
        post.commentsCount = commentEntities.filter((comment) => {
            return comment.postId === post.id;
        }).length;
    });

    return postEntities;
};

exports.getCommentsByPostId = (postId) => {
    const postComments = commentEntities.filter((comment) => {
        return comment.postId === postId;
    });

    return postComments;
};

exports.addPostToDb = (post) => {
    post.id = postEntities.length + 1;

    postEntities.splice(0, 0, post); // put latest posts on top (sorted by NEWEST)

    return post.id;
}

exports.addCommentToDb = (comment) => {
    comment.id = commentEntities.length + 1;

    commentEntities.push(comment);
    
    return comment.id;
}