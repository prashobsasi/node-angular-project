const { Pool } = require('pg');

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "password",
  database: "employee",
  max: 10,
  idleTimeoutMillis: 30000,
});

module.exports = pool;
