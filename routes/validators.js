const { check } = require('express-validator'); // deconstruct check out of express-validator

module.exports = {
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
};