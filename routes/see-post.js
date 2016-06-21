var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')

router.get('/:id', function(req, res, next){
  knex('post').join('user', 'user_id', 'user.id').select('post.id', 'user.name','post.title', 'post.body', 'post.img').where({'post.id': req.params.id}).first()
  .then(function(result){
    res.render('see-post', {result: result})
  })
})

module.exports = router;
