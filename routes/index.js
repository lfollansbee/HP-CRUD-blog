var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')

router.get('/', function(req, res, next) {
  knex('post')
  .join('user', 'user_id', 'user.id')
  .select('user.id as userId', 'user.name as userName', 'post.id as id', 'post.title', 'post.body', 'post.img')
  .then(function(posts){
    res.render('index', {list: posts})
  })
});

router.get('/add', function(req, res, next){
    res.render('add')
})

router.post('/add', function(req, res, next) {
  knex('user').first().returning('id')
  .insert({name: req.body["user.name"]})
  .then(function(userid) {
    return knex('post').insert({
      title: req.body.title,
      user_id: userid[0],
      body: req.body.body,
      img: req.body.img
    });
  }).then(function() {
    res.redirect('/');
  }).catch( function(error) {
  });
});

//Delete Post - have to delete comments first before deleting post
router.get('/:id/delete', function (req, res){
  knex('comment').where({post_id: req.params.id}).del()
  .then(function(){
    return knex('post').where({id: req.params.id}).del()
  })
  .then(function(){
    res.redirect('/')
  })
})

module.exports = router;
