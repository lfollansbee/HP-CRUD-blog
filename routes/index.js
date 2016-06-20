var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')

router.get('/', function(req, res, next) {
  knex('post').join('user', 'user_id', 'user.id')
  .then(function(posts){
    res.render('index', {list: posts})
  })
});

router.get('/write', function(req, res, next){
    res.render('write')
})

router.post('/write', function(req, res, next) {
  knex('user').first().returning('id').insert({name: req.body.name})
  .then(function() {
    return knex('post').insert(req.body);
}).then(function() {
    res.redirect('/');
}).catch( function(error) {
  });
});

router.get('/see-post/:id', function(req, res, next){
  knex('user').join('post', 'user_id', 'user.id').select('post.id', 'user.name','post.title', 'post.body', 'post.img').where({'post.id': req.params.id}).first()
  .then(function(result){
    console.log(result);
    res.render('see-post', {result: result})
  })
})

module.exports = router;
