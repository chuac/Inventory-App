const express = require('express');

const db = require('./mysql');
const { handleErrors, requireAuth } = require('./middlewares');
const inventoryIndexTemplate = './inventory/index';

const router = express.Router();


router.get('/inventory', 
    requireAuth,
    async (req, res) => {
        try {
            let [rows] = await db.pool.query('SELECT * FROM items ORDER BY last_updated DESC');
            if (rows.length > 0) { // found at least one item
                res.render(inventoryIndexTemplate, { rows });
            } else {
                res.render(inventoryIndexTemplate, { rows: [] });
            }
        } catch (error) {
            throw error;
        }
});


module.exports = router;