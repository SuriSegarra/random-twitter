require('dotenv').config();

const request = require('superagent');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Comment = require('../lib/models/Comments');
const Tweet = require('../lib//models/Tweet');

describe('app routes', () => {
  beforeAll(() => {
    connect()
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
});

it('creates a new comment', () => {
    return request(app)
    .post('/api/v1/tweets')
    .send({
        handle: 
    })
})