require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({
        handle: '@Suri',
        text: 'something'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle:expect.any(String),
          text: expect.any(String),
          __v: 0
        });
      });
  });
  
  it('gets all the tweets', () => {
    const tweets = [{
      handle: '@somebody',
      text: 'once told me the world is gonna roll me'
    },
    {
      handle: '@not_me',
      text: 'this tweet got thousands of retweets'
    }];

    return Tweet 
      .create(tweets)
      .then(() => {
        return request(app)
          .get('/api/v1/tweets');
      });
  });
});

