const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
//post tweet
  .post('/', (req, res, next) => {
    Tweet 
      .create(req.body)
      .then(tweet => res.send(tweet))
      .catch(next);
  })
//get all tweets
  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(tweet => res.send(tweet))
      .catch(next);
  })
//get tweets by the id 
  .get('/:id', (req, res, next) => {
    Tweet
      .findById(req.params.id)
      .then(tweet => res.send(tweet))
      .catch(next);
  })
//updates tweet
  .patch('/:id', (req, res, next) => {
    Tweet
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(tweet => res.send(tweet))
      .catch(next);
  })
//deletes tweets by id 
  .delete('/:id', (req, res, next) => {
    Tweet.findByIdAndDelete(req.params.id)
      .then(tweet => res.send(tweet))
      .catch(next);
  });
