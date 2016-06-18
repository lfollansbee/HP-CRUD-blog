var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('post')
  // .join('post', 'user.id', 'post.user_id')
  .select()
  .then(function(posts){
  res.render('index', {list: posts})
  })
});

router.post('/write', function(req, res, next) {
  knex('user').first().returning('id').insert({username: req.body.name})
  .then(function(userid) {
    return knex('post').insert({title: req.body.title, content: req.body.body, user_id: userid[0]});
}).then(function() {
    res.redirect('/');
}).catch( function(error) {
  });
});

router.get('/write', function(req, res, next){
    res.render('write')
})


module.exports = router;
