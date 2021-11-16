const { pool } = require("./pool");
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
  pool.query(
    `INSERT INTO IF NOT EXISTS Visitors (name, age, date, time, assistor, comments) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
    [name, age, date, time, assistor, comments],
    (error) => {
      if (error) {
        throw error
      }
      return JSON.stringify(name, age, date, time, assistor, comments);
    }
  );
};

const listAllVisitors = () => {
  pool.query("SELECT DISTINCT ID, Name FROM Visitors", (error, data) => {
    if (error) {
      throw error;
    } else {
      return data;
    }
  });
};

module.exports = { createTable, addNewVisitors };
