var pg = require('pg');

var pool = new pg.Pool({
  database: 'baby_boom'
});

module.exports = pool;
