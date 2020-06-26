require('dotenv').config(); // sets up .env environment variables
const express = require('express');
// const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session'); // also a middleware function

const db = require('./routes/mysql'); // the db connection is now made inside the mysqlPool module, and can be accessed from any other module!

const authRouter = require('./routes/auth');

const app = express();


app.set("view engine", "ejs"); // to use EJS templating engine
app.use(express.static('public')); // look inside our cwd, and the public folder and make it available to the world
app.use(bodyParser.urlencoded({ extended: true } )); // now every single route handler will be parsed by this. only handles url-encoded form data!
app.use(cookieSession({
    keys: ['tduzetdfjdfsaa2yaaq']
})); // cookie-session will encrypt the info we store in the cookie, when we provide a key string

app.use(authRouter);

app.get('/', (req, res) => {
    db.pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

    res.render('index');
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});