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
          title: 'Gryffindor',
          user_id: findUserId(users, "gryffindorLion"),
          body: 'The House of Godric Gryffindor has commanded the respect of the wizarding world for nearly ten centuries. Our colors are red and gold and our mascot is the lion!',
          img:'http://vignette4.wikia.nocookie.net/harrypotter/images/7/70/G_final.jpg/revision/latest?cb=2012092214360'
        }),
        knex('post').insert({
          title: 'Previous Gryffindor Passwords',
          user_id: findUserId(users, "theFatLady"),
          body: 'Passwords change frequently to ensure tip-top security! Some of the previous passwords are: Fortuna Major, Flibbertigibbet, Oddsbodikins, Scurvy Cur',
          img:'http://vignette4.wikia.nocookie.net/harrypotter/images/f/f5/FatLady.png/revision/latest?cb=20130708173732'
        }),
        knex('post').insert({
          title: 'Slytherin Ghost',
          user_id: findUserId(users, "bloodyBaron"),
          body: 'I\'m the Slytherin house ghost. I was a student at Hogwarts during the founder\'s time.',
          img:'http://vignette1.wikia.nocookie.net/harrypotter/images/d/da/S_final.jpg/revision/latest?cb=20111027165212'
        }),
        knex('post').insert({
          title: 'Wingardium Leviosa',
          user_id: findUserId(users, "Hermione"),
          body: 'It\'s Levi-OOOOH-sa not LevioSAR.',
          img:'http://imagesmtv-a.akamaihd.net/uri/mgid:file:http:shared:mtv.com/news/wp-content/uploads/2015/06/Hermione-Leviosa-not-LeviosAR-1433745598.gif?quality=.8&height=208&width=500'
        })
      )
    })
};
