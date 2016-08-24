exports.seed = function(knex, Promise) {
  return knex.raw("TRUNCATE \"user\" RESTART IDENTITY CASCADE")
    .then(function (){
      return Promise.join(
        knex('user').insert({name: 'gryffindorLion'}),
        knex('user').insert({name: 'theFatLady'}),
        knex('user').insert({name: 'bloodyBaron'}),
        knex('user').insert({name: 'Hermione'})
    )
  })
};
