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
  knex('user').first().returning('id').insert({name: req.body["user.name"]})
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

router.post('/edit/:id', function(req, res, next) {
    knex('post').where({id: req.params.id}).update({
      title: req.body.title,
      body: req.body.body,
      img: req.body.img
  }).then(function(){
    res.redirect('/see-post/'+ req.params.id)
  })
});

router.get('/see-post/:id', function(req, res, next){
  knex('user').join('post', 'user_id', 'user.id').select('post.id', 'user.name','post.title', 'post.body', 'post.img').where({'post.id': req.params.id}).first()
  .then(function(result){
    console.log(result);
    res.render('see-post', {result: result})
  })
})

module.exports = router;
