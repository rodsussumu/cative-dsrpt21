
exports.up = function(knex) {
    return knex.schema.raw('alter table users modify column capaPath text')
};

exports.down = function(knex) {
    return knex.schema.raw('alter table users modify column capaPath varchar(255)')
};
