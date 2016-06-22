var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')

router.get('/:id', function(req, res, next){
  Promise.all([
    knex('post').join('user', 'user_id', 'user.id').select('post.id', 'user.name','post.title', 'post.body', 'post.img').where({'post.id': req.params.id}).first(),
    knex('comment').join('user', 'user.id', 'user_id').select().where({'post_id': req.params.id})
  ])
  .then(function(results){
    res.render('see-post', {post: results[0], comments: results[1]})
  })
})

router.post('/:id', function(req, res, next){
  // console.log(req.body);
  knex('user').select().where({'user.name': req.body.name}).first()
  .then(function(user){
    // console.log(user);
    if(user){
      return [user]
    }else{
      return knex('user').insert({name: req.body.name}).returning('*')
    }
  })
  .then(function(user){
    // console.log(user);
    var comment = {
      user_id: user[0].id,
      post_id: req.params.id,
      body: req.body.body
    }
    return knex('comment').insert(comment)
  })
  .then(function(){
    res.redirect('/see-post/' + req.params.id)
  })
})

//Delete all comments
router.get('/:id/delete', function (req, res, next) {
  knex('comment').where({post_id: req.params.id}).del()
  .then(function () {
    res.redirect('/see-post/' + req.params.id)
  })
})

module.exports = router;
