const { pool } = require("./pool");

const dropTable = () => {
  pool.query("DROP TABLE IF EXISTS visitors"),
  (error) => {
    if (error) {
      throw error;
    }else{
      console.log("Successful")
    }
  }
};
const createTable = () => {
  pool.query(
    `CREATE TABLE Visitors ( id SERIAL PRIMARY KEY, name VARCHAR(50), age INT, date  DATE, time TIME, assistor VARCHAR(50), comments VARCHAR(100))`
  ),
    (error, data) => {
      if (error) {
        throw error;
      } else {
        return data;
      }
    };
};
const addNewVisitors = async (name, age, date, time, assistor, comments) => {
  const clause = `INSERT INTO Visitors (name, age, date, time, assistor, comments) 
          	       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const arg = [name, age, date, time, assistor, comments];
  const data = await pool.query(clause, arg);
  return data.rows[0];
};

const listAllVisitors = () => {
  pool.query("SELECT * FROM Visitors", (error, data) => {
    let info = data;
    if (error) {
      throw error;
    } else {
      console.log(info.rows);
    }
  });
};

const viewVisitor = (name) => {
  pool.query(`SELECT * FROM Visitors WHERE id = ${name}`),
    (error, data) => {
      if (error) {
        throw error;
      } else {
        console.log(data.rows);
      }
    };
};

module.exports = { createTable, addNewVisitors, dropTable }
