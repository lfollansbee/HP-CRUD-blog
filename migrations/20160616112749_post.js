
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', function(table){
    table.increments()
    table.string('title')
    table.integer('user_id').references('user.id')
    table.text('body')
    table.string('img')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post')
};
