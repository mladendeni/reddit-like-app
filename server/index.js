const cors = require('@koa/cors');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBodyParser = require('koa-bodyparser');

const Koa = require('koa');
const app = module.exports = new Koa();

// "database"

const { getPostById, getPostsWithCommentsCount, getCommentsByPostId, addPostToDb, addCommentToDb } = require('./db/mockDb');

// middleware

app.use(cors());

app.use(logger());

app.use(koaBodyParser());

// route definitions

router.get('/posts', posts)
    .post('/add-post', addPost)
    .get('/comments/:postId', comments)
    .post('/add-comment/:postId', addComment);

app.use(router.routes());

/**
 * Post listing.
 */

async function posts(ctx) {
    ctx.body = {
        posts: getPostsWithCommentsCount()
    };
}

/**
 * Post adding.
 */

async function addPost(ctx) {
    if (!ctx.request.body.author) {
        ctx.throw(500, 'Missing author!');
    }

    if (!ctx.request.body.content) {
        ctx.throw(500, 'Missing content!');
    }

    const post = {
        author: ctx.request.body.author.trim(),
        content: ctx.request.body.content.trim(),
        createdOn: Date.now(),
        comments: []
    };

    const postId = addPostToDb(post);

    ctx.body = { id: postId };
}

/**
 * Comments listing.
 */

async function comments(ctx) {
    const postId = parseInt(ctx.params.postId);

    ctx.body = {
        comments: getCommentsByPostId(postId)
    };
}

/**
 * Comment adding.
 */

async function addComment(ctx) {
    const postId = parseInt(ctx.params.postId);
    const postEntity = getPostById(postId);

    if (!postEntity) {
        ctx.throw(500, 'Missing post!');
    }

    if (!ctx.request.body.author) {
        ctx.throw(500, 'Missing author!');
    }

    if (!ctx.request.body.content) {
        ctx.throw(500, 'Missing content!');
    }

    const comment = {
        postId: postId,
        author: ctx.request.body.author.trim(),
        content: ctx.request.body.content.trim(),
        createdOn: Date.now()
    };

    const commentId = addCommentToDb(comment);

    ctx.body = { id: commentId };
}


// listen

if (!module.parent) app.listen(3001);