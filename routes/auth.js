const express = require('express');
const ejs = require('ejs');

const db = require('./mysqlPool');
const { handleErrors } = require('./middlewares');
const signupTemplate = './auth/signup';
const signinTemplate = './auth/signin';
const { requireUsername,
        requireEmail,
        requirePassword,
        requirePasswordConfirmation
    } = require('./validators');
const { comparePasswords, createHashedPassword } = require('./helpers');

const router = express.Router(); // instead of app, this Router will link it back to where app is created in index.js

// router.locals.getError = function (errors, property) {
//     try {
//         return errors.mapped()[property].msg;
//     } catch (err) {
//         return '';
//     }
// };

router.get('/signup', (req, res) => {
    res.render(signupTemplate, { });
});

router.post('/signup', 
    [
        requireUsername,
        requireEmail,
        requirePassword,
        requirePasswordConfirmation
    ],
    handleErrors(signupTemplate),
    async (req, res) => {
        const { username, email, password } = req.body; // all form data is contained inside req.body

        const values = [ username, email, await createHashedPassword(password) ];

        db.pool.query('INSERT INTO users(username, email, password_hash) VALUES (?, ?, ?)', values, (error, results, fields) => {
            if (error) throw error;
            console.log(results);
        });

        res.redirect('/signup');
});

router.get('/signin', (req, res) => {
    res.render(signinTemplate);
});

module.exports = router;