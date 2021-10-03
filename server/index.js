const cors = require('@koa/cors');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const Koa = require('koa');
const app = module.exports = new Koa();

// "database"

const posts = [
    {
        id: 2,
        author: 'Mladen',
        createdOn: 1633160531499,
        content: 'Hello. This is my first post on Reddit.',
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

const getPostsWithCommentsCount = () => {
    posts.forEach((post) => {
        post.commentsCount = commentEntities.filter((comment) => {
            return comment.postId === post.id;
        }).length;
    });

    return posts;
};

const getCommentsByPostId = (postId) => {
    const postComments = commentEntities.filter((comment) => {
        return comment.postId === postId;
    });
    
    return postComments;
};

// middleware

app.use(cors());

app.use(logger());

app.use(koaBody());

// route definitions

router.get('/posts', list)
    .post('/add-post', add)
    .get('/comments/:postId', comments);

app.use(router.routes());

/**
 * Post listing.
 */

async function list(ctx) {
    ctx.body = {
        posts: getPostsWithCommentsCount()
    };
}

/**
 * Post adding.
 */

async function add(ctx) {
    if (!ctx.request.body.author) {
        ctx.throw(500, 'Missing author!');
    }

    if (!ctx.request.body.content) {
        ctx.throw(500, 'Missing content!');
    }

    const post = {
        id: posts.length + 1,
        author: ctx.request.body.author.trim(),
        content: ctx.request.body.content.trim(),
        createdOn: Date.now(),
        comments: []
    };

    posts.push(post);

    ctx.body = { id: post.id };
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

// listen

if (!module.parent) app.listen(3001);