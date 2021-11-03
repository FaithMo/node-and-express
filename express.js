//======================STATIC=FILE=SERVER================================

const express = require('express');
const app = express();
const port = 2000;
const bodyParser = require('body-parser');
const Http = require('http');
// const pool = require("./pool")

app.get('/', (req, res) => res.send('Static file expressJS'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

app.listen(port, () => console.log(`http://localhost:${port}/new_visit`));

//=======================DATABASE==SERVER================================
const Pool = require("pg").Pool;
const pool = new Pool({
    user: "user3",
    host: "localhost",
    database: "db",
    password: "pass3",
    port: 5432
  })
module.exports = pool
  
let dbConnection = pool.connect(function(err) {
    if (err) console.log(err + " Ooops");
    else console.log("Adminer 4.7.5 server Connected!");
  });

app.post('/database-approval', (req, res) => {
  addNewVisitors(req.body);
  res.send(`Thanks for the info! The following was saved to the database: ${JSON.stringify(req.body)}`);
});


//============================FUNCTIONS=====================================c

const addNewVisitors = (dataObj) => {
    pool.query(
      `INSERT INTO Visitors (Name, Age, Date, Time, Assistor, Comments) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [dataObj.name,dataObj.age,dataObj.date,dataObj.time,dataObj.assistor,dataObj.comments],
      (error) => {
        if (error) {throw new Error (error)}
        console.log(JSON.stringify(dataObj));
      });
};

const listAllVisitors = () => {
  pool.query( "SELECT DISTINCT ID, Name FROM Visitors", (error, respond) => {
      console.log(error, respond);
  });
}
