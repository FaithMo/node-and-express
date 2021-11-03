//======================STATIC=FILE=SERVER================================

const express = require('express');
const port = 2000;
const bodyParser = require('body-parser');
const path = require('path')
const pool = require("./pool")

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

pool.connect(function(err) {
  if (err) console.log(err + " Ooops");
  else console.log("Connected!");
});

app.use(express.static('public'));

app.listen(port, () => console.log(`http://localhost:${port}/new_visit`));

// app.post('/database-approval', (req, res) => {
//   addNewVisitors(req.body);
//   res.send(`Thanks for the info! The following was saved to the database: ${JSON.stringify(req.body)}`);
// });


//============================FUNCTIONS=====================================c

const addNewVisitors = (dataObj) => {
    pool.query(
      `INSERT INTO Visitors (Name, Age, Date, Time, Assistor, Comments) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [dataObj.name,dataObj.age,dataObj.date,dataObj.time,dataObj.assistor,dataObj.comments],
      (error) => {
        if (error) {throw new Error (error)}
        console.log(JSON.stringify(dataObj));
        return JSON.stringify(dataObj)
      });
};

let add = addNewVisitors({'Name': 'Faith', 
'Age': 23, 'Date': '2010-09-12', 
'Time': '19:00', 'Assistor': 'Kim', 
'Comments': 'Nothing'})
console.log(add)

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
app.get('/new_visit', (req, res) => {
  res.render('views', `Your data: ${add}`)
});
const listAllVisitors = () => {
  pool.query( "SELECT DISTINCT ID, Name FROM Visitors", (error, respond) => {
      console.log(error, respond);
  });
}

