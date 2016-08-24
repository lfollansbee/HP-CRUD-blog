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
          post_id: findPostId(posts, 'Slytherin Ghost'),
          body: 'Slytherins have produced the most dark wizards of any house.'}),
        knex('comment').insert({
          user_id: findUserId(users, "Hermione"),
          post_id: findPostId(posts, 'Gryffindor'),
          body: 'So proud to be a Gryffindor!'}),
        knex('comment').insert({
          user_id: findUserId(users, "bloodyBaron"),
          post_id: findPostId(posts, 'Previous Gryffindor Passwords'),
          body: 'I wish the Fat Lady was less emotional sometimes.'})
      ])
    })
  })
};
