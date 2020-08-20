const express = require('express');
const mysql = require('mysql')

// create connection with mysqk

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Venus#88',
    database: 'node'
})

// connect

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('mysql-connected')
})

const app = express();

// create table

app.get('/createtable',(req,res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Posts table is created')
    })
})

// Insert post 1
app.get('/add', (req,res) => {
    let post = {title: 'post 1', body: 'Credo desde nbode con mysql'} 
    let sql = 'INSERT INTO posts SET ?'
    let query = db.query(sql, post, (err, resul) => {
        if(err) throw err;
        console.log(resul);
        res.send('Post one add')
    })
})

//Select a simple post

app.get('/getpost/:id', (req,res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM posts WHERE id = ${id}`
    let query = db.query(sql, post, (err, resul) => {
        if(err) throw err;
        console.log(resul);
        res.send('Post one add')
    })
})

app.listen(3000, () => console.log('The server is running in Port 3000'))