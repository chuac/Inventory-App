// To create a pool of connections to the MySQL db. These pool of connections can then be used by other modules, simply by requiring this module!

require('dotenv').config(); // sets up .env environment variables

const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit : 10,
    host    : 'localhost',
    user    : process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'inventory_app'
});

module.exports.pool = pool;

//// We could also export getConnection() below if we wanted to do share connection state for subsequent queries (transanctions possibly). Pools can't guarantee this
// module.exports.getConnection = function(callback) {
//     pool.getConnection(function(err, conn) {
//         if(err) {
//             return callback(err);
//         }
//         callback(err, conn);
//     });
// };

