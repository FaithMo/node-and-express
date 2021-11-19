const Pool = require("pg").Pool
require('dotenv').config()
const pool = new Pool({
  user: process.env.user || "user3",
  host: process.env.host || "localhost",
  database: process.env.database || "db",
  password: process.env.password || "pass3",
  port: process.env.port || "5432",
});

module.exports = {pool}