const express = require('express') //initialize express server
const app = express()
const mysql = require('mysql') //initialize db connection
const bodyParser = require('body-parser')
const cors = require('cors')
const { json } = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cruddatabase'
})

app.get("/api/get", (req, res) => {
        const sqlSelect = "SELECT * from movie_reviews";
        db.query(sqlSelect, (err, result) => {
            res.send(result);
        });
    })
    //insert info to db
app.post("/api/insert", (req, res) => {
    //catch name&review
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
})
//: -> pass param
app.delete('/api/delete/:movieName',(req,res)=>{
    const name=req.params.movieName;
    const sqlDelete="DELETE FROM movie_reviews WHERE movieName = ?";
    db.query(sqlDelete,name, (err,result) => {
        if(err)console.log(err);
    });
})

app.put('/api/update',(req,res)=>{
    const name=req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate="UPDATE  movie_reviews set movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate,[review,name], (err,result) => {
        if(err)console.log(err);
    });
})
app.listen(3001, () => {
    console.log("running on port 3001");
})