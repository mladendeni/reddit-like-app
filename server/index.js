const cors = require('@koa/cors');
const logger = require('koa-logger');
const router = require('koa-router')();

const Koa = require('koa');
const app = module.exports = new Koa();

// "database"

const posts = [
  {
    author: 'Mladen',
    createdOn: 1633160531499,
    content: 'Hello. This is my first post on Reddit.',
    comments: []
  },
  {
    author: 'mr_new_driver',
    createdOn: 1632070515993,
    content: 'Should you use indicator when entering a roundabout in Bulgaria and which one if "yes"?',
    comments: [
      {
        author: 'pro_driver',
        createdOn: 1632070555993,
        content: 'The right one'
      }
    ]
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