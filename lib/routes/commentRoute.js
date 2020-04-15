const { Router } = require('express');
const Comment = require('../models/Comments');

module.export = Router()

//create a comment
  .post('/', (req, res, next) => {
    Comment.create(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  })
//get comment by id 
  .get('/:id', (req, res, next) => {
    Comment
      .findById(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  })
//update a comment
  .patch('/:id', (req, res, next) => {
    Comment
      .findByIdAndUpdate(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  })
//deletes a comment 
  .delete('/:id', (req, res, next) => {
    Comment 
      .create(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  });
