const Pool = require("pg").Pool;
const pool = new Pool({
    user: "user3",
    host: "localhost",
    database: "db",
    password: "pass3",
    port: 5432
  })
module.exports = pool