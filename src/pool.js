require('dotenv').config()
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.user || "user3",
  host: process.env.host || "localhost",
  database: process.env.database || "db",
  password: process.env.password,
  port: process.env.port || "1000",
});

module.exports = {pool}