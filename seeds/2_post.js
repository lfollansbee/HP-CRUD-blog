function findUserId(users, name) {
  for (var i=0; i< users.length; i++){
    var user = users[i];
    if (name === user.name) {
      return user.id
    }
  }
}

exports.seed = function(knex, Promise) {
  return knex('post').del()
     .then(function () {
       return knex("user").select()
     })
    .then(function (users){
      return Promise.join(
        knex('post').insert({
          title: 'Gryffindor Colors',
          user_id: findUserId(users, "gryffindorLion"),
          body: 'Our colors are red and gold and our mascot is the lion!',
          img:'http://vignette4.wikia.nocookie.net/harrypotter/images/7/70/G_final.jpg/revision/latest?cb=2012092214360'
        }),
        knex('post').insert({
          title: 'Previous Gryffindor Passwords',
          user_id: findUserId(users, "theFatLady"),
          body: 'Fortuna Major, Flibbertigibbet, Oddsbodikins, Scurvy Cur',
          img:'http://vignette4.wikia.nocookie.net/harrypotter/images/f/f5/FatLady.png/revision/latest?cb=20130708173732'
        }),
        knex('post').insert({
          title: 'Slytherins',
          user_id: findUserId(users, "bloodyBaron"),
          body: 'I\'m the Slytherin house ghost.',
          img:'http://vignette1.wikia.nocookie.net/harrypotter/images/d/da/S_final.jpg/revision/latest?cb=20111027165212'
        })
      )
    })
};
