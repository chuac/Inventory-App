// To create a pool of connections to the MySQL db. These pool of connections can then be used by other modules, simply by requiring this module!

require('dotenv').config(); // sets up .env environment variables

const mysql = require('mysql2'); // mysql2 supports Promises https://www.npmjs.com/package/mysql2

const pool  = mysql.createPool({
    connectionLimit : 10,
    host    : 'localhost',
    user    : process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'inventory_app'
});

// const getOne = async (id) => {
//     try {
//         let [rows] = await pool.query('SELECT * FROM items WHERE id = ?', id);
//         if (rows.length > 0) { // found at least one item
//             return rows;
//         } else {
//             //res.send([]); // maybe a no-item found string/error?
//         }
//     } catch (error) {
//         throw error; // maybe send an error HTTP object?
//     }
// }

module.exports.pool = pool.promise();
// module.exports = {
//     getOne
// }

//// We could also export getConnection() below if we wanted to do share connection state for subsequent queries (transanctions possibly). Pools can't guarantee this
// module.exports.getConnection = function(callback) {
//     pool.getConnection(function(err, conn) {
//         if(err) {
//             return callback(err);
//         }
//         callback(err, conn);
//     });
// };

