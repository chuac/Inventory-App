require('dotenv').config(); // sets up .env environment variables
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session'); // also a middleware function

const app = express();

const connection = mysql.createConnection({
    host    : 'localhost',
    user    : process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'inventory_app'
});

app.set("view engine", "ejs"); // to use EJS templating engine
app.use(express.static('public')); // look inside our cwd, and the public folder and make it available to the world
app.use(bodyParser.urlencoded({ extended: true} )); // now every single route handler will be parsed by this. only handles url-encoded form data!
app.use(cookieSession({
    keys: ['tduzetdfjdfsaa2yaaq']
})); // cookie-session will encrypt the info we store in the cookie, when we provide a key string

app.get('/', (req, res) => {
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
    res.render('index');
});

app.get('/signin', (req, res) => {
    res.render('auth/signin');
})

app.get('/signup', (req, res) => {
    res.render('auth/signup');
})

//connection.end();

app.listen(3000, () => {
    console.log('Listening on port 3000');
});