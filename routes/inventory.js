const express = require('express');

const db = require('./mysql');
const { handleErrors, requireAuth } = require('./middlewares');
const inventoryIndexTemplate = './inventory/index';
const inventoryCreateTemplate = './inventory/create';
const { requireValidItemName
} = require('./validators');

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

router.get('/inventory/create',
    requireAuth,
    async (req, res) => {
        res.render(inventoryCreateTemplate);
});

router.post('/inventory/create',
    requireAuth,
    [
        requireValidItemName
    ],
    async (req, res) => {
        // if passed validation then insert item into db
        console.log(req.body);
        res.send('done');
});

router.get('/inventory/:id/update',
    requireAuth,
    async (req, res) => {
        // :id from URL can be accessed at req.params.id
        // show a form, pre-populated with the item's data
        console.log(req.params.id);
        res.send(req.params.id);
});

router.get('/inventory/add',
    requireAuth,
    async (req, res) => {
        // :id from URL can be accessed at req.params.id
        // show an empty form to create items
        console.log();
        res.send();
});


module.exports = router;