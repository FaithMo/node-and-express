const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const pool = require("./src/pool")

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

pool.connect((error) => {
  if(err){
    throw error
  }else{
  console.log("Connected!");
  }
});

app.listen(2000, () => console.log(`http://localhost:${2000}/new_visit`));

const createTable = () => {
  pool.query(`CREATE TABLE Visitors ( id SERIAL PRIMARY KEY, name VARCHAR(50), age INT, date  DATE, time TIME, assistor VARCHAR(50), comments VARCHAR(100))`),
  (error, data) => {
    if(error) {
      throw error
    } else {
      return data
    }
  }
}

const addNewVisitors = async (name, age, date, time, assistor, comments) => {
    pool.query(
      `INSERT INTO Visitors (name, age, date, time, assistor, comments) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [name,age,date,time,assistor,comments],
      (error) => {
        if(error){
          throw new Error("Visitor Not Added")
        }
      return JSON.stringify(name,age,date,time,assistor,comments)
      }
)};

app.get('/new_visit', (req, res) => {
  res.sendFile(path.join(__dirname+'/new_visit.html'));
  console.log(req.body)
})

createTable()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.post('/thanks', (req, res) => {
  let userInfo = req.body
  console.log(userInfo)
  // const visitor = await addNewVisitors(
  //   userInfo.name,
  //   userInfo.age,
  //   userInfo.date,
  //   userInfo.time,
  //   userInfo.assistor,
  //   userInfo.comments
  // );
  res.render("./views", {
    title: "thanks",
    message: "Thank you for the info!",
    name: userInfo.name,
    age: userInfo.age,
    date: userInfo.date,
    time: userInfo.time,
    assistant: userInfo.assistor,
    comments: userInfo.comments,
  });
});
  // res.render('views', {title: 'Your data: ', data: `${add}`})
  //data.sendFile(path.join(__dirname+'../../new_visit.html'));
// });
const listAllVisitors = () => {
  pool.query( "SELECT DISTINCT ID, Name FROM Visitors",
  (error, data) => {
    if(error){
      throw error
    } else {
      return data
    }}
  )}

