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
  
  it('gets all the tweets', async() => {
    const tweets = await Tweet.create([
      { handle: '@idontdude', text: 'not funny tweet' },
      { handle: '@meeitherdude', text: 'really funny tweet' },
      { handle: '@whaaat', text: 'famouse  tweet' },
    ]);

    return request(app)
      .get('/api/v1/tweets')
      .then(res => {
        tweets.forEach(tweet => {
          expect(res.body).toContainEqual({
            _id: tweet._id.toString(),
            handle: tweet.handle,
            text: tweet.text,
            __v: 0
          });
        });
      });
  });
  it('updates a tweet by the id', async() => {
    const tweet = await Tweet.create(
      { handle: '@myusername', text: 'corona virus', });
      
    return request(app)
      .patch(`/api/v1/tweets/${tweet._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: tweet.handle,
          text: tweet.text,
          __v: 0
        });
      });
  });
  it('deletes tweet by id', async() => {
    const tweet = await Tweet.create(
      { handle: '@anotherUser', text: 'another cool tweet' });

    return request(app)
      .delete(`/api/v1/tweets/${tweet._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: tweet._id.toString(),
          handle: tweet.handle,
          text: tweet.text,
          __v: 0
        });
      });
  });
});
