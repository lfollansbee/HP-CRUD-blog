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


// router.get('/:id/detail', function(req, res, next){
//   knex('post')
// })

module.exports = router;
