const express = require('express');
const ejs = require('ejs');
//const flash = require('connect-flash');

const db = require('./mysql');
const { handleErrors } = require('./middlewares');
const signupTemplate = './auth/signup';
const signinTemplate = './auth/signin';
const { requireUniqueEmail,
        requireUniqueUsername,
        requirePassword,
        requirePasswordConfirmation,
        requireEmailExists,
        requireValidPasswordForUser
    } = require('./validators');
const { createHashedPassword } = require('./helpers');

const router = express.Router(); // instead of app, this Router will link it back to where app is created in index.js

// router.locals.getError = function (errors, property) {
//     try {
//         return errors.mapped()[property].msg;
//     } catch (err) {
//         return '';
//     }
// };

router.get('/signup', (req, res) => {
    res.render(signupTemplate);
});

router.post('/signup', 
    [
        requireUniqueUsername,
        requireUniqueEmail,
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

router.post('/signin',
    [
        requireEmailExists,
        requireValidPasswordForUser
    ],
    handleErrors(signinTemplate),
    async (req, res) => {
        const { email } = req.body;

        try {
            let [rows] = await db.pool.query('SELECT id FROM users WHERE email = ?', email);
            if (rows.length > 0) { // found a user
                req.session.userId = rows[0].id; // attach user's id to their cookie data to keep them signed in
            }
        } catch (error) {
            throw error;
        }

        res.redirect('/signin');
});

router.get('/signout', (req, res) => {
    //req.session = null; // clear out any cookie data the user has
    req.flash('info', 'Logged out!'); // // Set a flash message by passing the key, followed by the value, to req.flash().
    res.redirect('/');
});

module.exports = router;