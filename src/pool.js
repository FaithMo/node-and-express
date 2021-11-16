const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.user || "user3",
  host: process.env.host || "pass3",
  database: process.env.database || "db",
  password: process.env.password || "pass3",
  port: process.env.port || "1000",
});

module.exports = {pool}