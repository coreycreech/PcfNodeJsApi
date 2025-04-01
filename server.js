const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const server = express()


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

server.listen(3000)*/