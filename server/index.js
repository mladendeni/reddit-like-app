const cors = require('@koa/cors');
const logger = require('koa-logger');
const router = require('koa-router')();

const Koa = require('koa');
const app = module.exports = new Koa();

// "database"

const posts = [
  {
    author: 'Mladen',
    createdOn: Date.now(),
    content: 'Hello. This is my first post on Reddit.',
    comments: []
  }
];

// middleware

app.use(cors());

app.use(logger());

// route definitions

router.get('/posts', list);

app.use(router.routes());

/**
 * Post listing.
 */

async function list(ctx) {
  ctx.body = { posts: posts };
}

// listen

if (!module.parent) app.listen(3001);