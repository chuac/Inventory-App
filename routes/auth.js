const express = require('express');
const ejs = require('ejs');

const { handleErrors } = require('./middlewares');
const signupTemplate = './auth/signup';
//const signupTemplate = require('../views/auth/signup.ejs');
//const signinTemplate = require('../views/auth/signin');
const { requireEmail,
        requirePassword,
        requirePasswordConfirmation
    } = require('./validators');

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
        requireEmail,
        requirePassword,
        requirePasswordConfirmation
    ],
    handleErrors(signupTemplate),
    async (req, res) => {
        const { email, password } = req.body; // all form data is contained inside req.body

        console.log(email);
        console.log(password);

        res.redirect('/signup');
});

module.exports = router;