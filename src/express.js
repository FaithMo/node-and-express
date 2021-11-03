//======================STATIC=FILE=SERVER================================

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const pool = require("./pool")

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

pool.connect(() => {
  console.log("Pool connected!");
});

app.listen(2000, () => console.log(`http://localhost:${2000}/new_visit`));

const createTable = () => {
  pool.query(`CREATE TABLE Visitors ( id SERIAL PRIMARY KEY, name VARCHAR(50), age INT, date  DATE, time TIME, assistor VARCHAR(50), comments VARCHAR(100))`)
}

const addNewVisitors = (dataObj) => {
    pool.query(
      `INSERT INTO Visitors (name, age, date, time, assistor, comments) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [dataObj.name,dataObj.age,dataObj.date,dataObj.time,dataObj.assistor,dataObj.comments])
      return JSON.stringify(dataObj)

};

const add = addNewVisitors({'name': 'Faith', 
'age': 45, 'date': '2010-09-12', 
'time': '19:00', 'assistor': 'Kim', 
'comments': 'Nothing'})

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
app.get('/new_visit', (_,res) => {
  res.render('views', {title: 'Your data: ', data: `${add}`})
});
const listAllVisitors = () => {
  pool.query( "SELECT DISTINCT ID, Name FROM Visitors");
}

