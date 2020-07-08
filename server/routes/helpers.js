const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt); // since the regular scrypt deals with callback functions, we'll wrap it with promisify

const comparePasswords = async (saved, supplied) => {
    // saved -> password saved in our db. in the form of 'hashed.salt'
    // supplied -> plain text password provided from the form data
    const [hashed, salt] = saved.split('.'); // destructuring from split()'s output

    const buffer = await scrypt(supplied, salt, 64);
    const suppliedHashed = buffer.toString('hex');

    return (hashed === suppliedHashed);
};

const createHashedPassword = async (supplied) => {
    const salt = crypto.randomBytes(8).toString('hex'); // random numbers and letters for our pw salt
    const buffer = await scrypt(supplied, salt, 64);
    const hashed = buffer.toString('hex');

    return `${hashed}.${salt}`;
};


module.exports = { comparePasswords, createHashedPassword };