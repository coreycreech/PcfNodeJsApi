const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const e = require('express');
const server = express()
server.use(bodyParser.json());
const cors = require('cors');

server.use(cors());


// PCF Database connection
const db = mysql.createConnection({
    host: "107.180.118.228",
    user: "sa",
    password: "GodIsLord#090270",
    database: "PerfectingChristianFaithDb",
    port: "3306"
})

db.connect(function (error){
    if(error){
        console.log("Error connecting to DB");
    }else{
        console.log("successfully connected to DB");
    }
});
/*
server.get('/', (req, res) => {
  res.send('Hello World')
})
*/


server.listen(3000, function check(error){
    if(error) console.log("Error.....!!!!!");
    else console.log("Started.....!!!!!");
})

//INSERT PageInfo RECORD
server.post("/api/PageInfo/add", (req, res) => {
    let details = {
        name: req.body.name,
        title: req.body.title,
        information: req.body.information
    };
    let sql = "INSERT INTO PageInfo SET ?";
    db.query(sql, details, (error) =>{
        if(error){
            res.send({status: false, message: "PageInfo INSERT failed"});
        }else{
            res.send({status: true, message: "PageInfo INSERT was successful"});
        }
    })
});

//GET PageInfo RECORDS
server.get("/api/PageInfo", (req, res) => {
    var sql = "SELECT * FROM PageInfo";
    db.query(sql, (error, result) =>{
        if(error){
            console.log("Error connecting to DB");
        }else{
            res.send({status: true, data: result});
        }
    });
});

//GET PageInfo BY ID
server.get("/api/PageInfo/:id", (req, res) => {
    var pageId = req.params.id;
    var sql = "SELECT * FROM PageInfo WHERE pageId=" + pageId;
    db.query(sql, (error, result) =>{
        if(error){
            console.log("Error connecting to DB");
        }else{
            res.send({status: true, data: result});
        }
    });
});

//UPDATE PageInfo RECORD
server.put("/api/PageInfo/update/:id", (req, res) => {
    let sql = 
        "UPDATE PageInfo SET name='" + 
         req.body.name +
        "', title='" + 
        req.body.title +
        "', information='" + 
        req.body.information +
        "'  WHERE pageId=" + 
        req.params.id;
    
    let a = db.query(sql, (error, result) => {
        if(error){
            res.send({status: false, message: "PageInfo UPDATE failed: " + error.message + "  " + sql});
        }else{
            res.send({status: true, message: "PageInfo UPDATE was successful"});
        }
    })
});


//DELETE PageInfo BY ID
server.delete("/api/PageInfo/delete/:id", (req, res) => {
    var sql = "DELETE FROM PageInfo WHERE pageId=" + req.params.id;
    let query = db.query(sql, (error) =>{
        if(error){
            res.send({status: false, message: "PageInfo Delete Failed"});
        }else{
            res.send({status: true, message: "PageInfo Delete was Successful"});
        }
    });
});