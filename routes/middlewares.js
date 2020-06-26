const { validationResult } = require('express-validator');

function getError(errors, property) { // parse validation result error data
    try {
        return errors.mapped()[property].msg;
    } catch (err) {
        return '';
    }
};

module.exports = {
    handleErrors(templateFunc, dataCallback) { 
        return async (req, res, next) => { // middlewares must return functions
            const errors = validationResult(req); // errors is array of objects
            if (!errors.isEmpty()) {
                let data = {}; // if our templateFunc needs some data, we'll store it in this object
                if (dataCallback) {
                    data = await dataCallback(req); // run the function given to us (grab the data they need)
                }
                console.log('where we want to print errors');
                console.log(errors);

                return res.render(templateFunc, { getError, errors, ...data });
                //return res.send(templateFunc({ errors, ...data })); // spread the data and return it back to them
            }

            next(); // everything went well! tells Express to do the next thing
        }
    },
    requireAuth(req, res, next) { // attach this middleware to any route that requires user to be signed in
        if (!req.session.userId) { // if user not signed in (they don't have userId in their session cookies)
            return res.redirect('/signin');
        }

        next(); // everything was okay, tell Express to continue on
    }
};