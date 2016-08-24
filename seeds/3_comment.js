function findUserId(users, name) {
  for (var i=0; i< users.length; i++){
    var user = users[i];
    if (name === user.name) {
      return user.id
    }
  }
}

function findPostId(posts, title) {
  for (var i=0; i< posts.length; i++){
    var post = posts[i];
    if (title === post.title) {
      return post.id
    }
  }
}

exports.seed = function(knex, Promise) {
  return knex('comment').del()

     .then(function () {
       return Promise.all([
        knex("user").select(),
        knex("post").select()
      ])
    .then(function (data){
      var users = data[0]
      var posts = data[1]
      return Promise.all([
        knex('comment').insert({
          user_id: findUserId(users, "gryffindorLion"),
          post_id: findPostId(posts, 'Slytherins'),
          body: 'comment 1'}),
        knex('comment').insert({
          user_id: findUserId(users, "theFatLady"),
          post_id: findPostId(posts, 'Gryffindor Colors'),
          body: 'comment 2'}),
        knex('comment').insert({
          user_id: findUserId(users, "bloodyBaron"),
          post_id: findPostId(posts, 'Previous Gryffindor Passwords'),
          body: 'comment 3'})
      ])
    })
  })
};
