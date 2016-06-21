var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')

router.get('/:id', function(req, res, next){
  knex('user').join('post', 'user_id', 'user.id').select('post.id', 'user.name','post.title', 'post.body', 'post.img').where({'post.id': req.params.id}).first()
  .then(function(result){
    res.render('edit', {result: result})
  })
})

router.post('/:id', function(req, res, next) {
  knex('post').where({id: req.params.id}).update({
    title: req.body.title,
    body: req.body.body,
    img: req.body.img,
  }).then(function(){
    res.redirect('/see-post/'+ req.params.id)
  })
});

module.exports = router;
