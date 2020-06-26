const express = require('express');

const db = require('./mysql');
const { handleErrors, requireAuth } = require('./middlewares');
const inventoryIndexTemplate = './inventory/index';

const router = express.Router();


router.get('/inventory', 
    requireAuth,
    async (req, res) => {
        res.render(inventoryIndexTemplate);
});


module.exports = router;