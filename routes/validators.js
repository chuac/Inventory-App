const { check } = require('express-validator'); // deconstruct check out of express-validator
const db = require('./mysql');
const { comparePasswords } = require('./helpers');

module.exports = {
    requireUsername: check('username')
        .trim()
        .isLength( { min: 2, max: 20 })
        .withMessage('Must be between 2 and 20 characters'),
    requireEmail: check('email') // 'email' here refers to the name="email" property in our HTML form
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be a valid email'),
    requirePassword: check('password')
        .trim()
        .isLength( { min: 4, max: 20 })
        .withMessage('Must be between 4 and 20 characters'),
    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength( { min: 4, max: 20 })
        .withMessage('Must be between 4 and 20 characters')
        .custom((passwordConfirmation, { req }) => {
            if (passwordConfirmation !== req.body.password) {
                throw new Error('Passwords must match');
            } else {
                return true; // need this so the validator wouldn't return with an 'Invalid Value' even if the passwords matched
            }
        }),
    requireEmailExists: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (email) => {
            try {
                let [rows] = await db.pool.query('SELECT id FROM users WHERE email = ?', email);
                if (rows.length === 0) { // no rows in the query result, meaning user NOT found by that email
                    throw new Error('Email not found');
                }
            } catch (error) {
                throw error;
            }

            //// code below doesn't work because it's using callback function with async/await

            // await db.pool.query('SELECT id FROM users WHERE email = ?', [email], (error, rows, fields) => {
            //     if (error) throw error;

            //     if (typeof rows[0] === 'undefined') { // no result, meaning no user at that email
            //         throw new Error('Email not found');
            //     }
            // });
        }),
    requireValidPasswordForUser: check('password')
        .trim()
        .custom(async (password, { req }) => {
            try {
                console.log(req.body.email);
                let [rows] = await db.pool.query('SELECT password_hash FROM users WHERE email = ?', req.body.email);
                if (rows.length > 0) {
                    const validPassword = await comparePasswords(rows[0].password_hash, password);

                    if (!validPassword) {
                        throw new Error('Invalid password');
                    } else {
                        console.log('password ok');
                    }
                }
            } catch (error) {
                throw error;
            }
        })
};