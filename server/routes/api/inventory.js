const express = require('express');

const db = require('../mysql');
//const { getOne } = require('../mysql');

const router = express.Router();

// GET all items
router.get('/api/inventory', async (req, res) => {
    // const test = [
    //     { abc: 'Hello World'}
    // ];
    // res.send(test);
    try {
        let [rows] = await db.pool.query('SELECT * FROM items ORDER BY last_updated DESC');
        if (rows.length > 0) { // found at least one item
            res.send(rows);
        } else {
            res.send([]);
        }
    } catch (error) {
        res.status(500).send({error});
    }
});

// GET one item
router.get('/api/inventory/:id', async (req, res) => {
    // :id from URL can be accessed at req.params.id
    const id = req.params.id;
    try {
        let [rows] = await db.pool.query('SELECT * FROM items WHERE id = ?', id);
        if (rows.length > 0) { // found at least one item
            res.send(rows);
        } else {
            res.status(404).send({ message: 'No item found with that id' })
        }
    } catch (error) {
        res.status(500).send({error});
    }
});

// POST a new item
router.post('/api/inventory', async (req, res) => {
    console.log(req.body);
    const { name, size, num_count, description } = req.body; // all form data is contained inside req.body
    
    const values = [ name, size, num_count, description ];

    try {
        let [rows] = await db.pool.query('INSERT INTO items(name, size, num_count, description) VALUES(?)', [values]);
        
        console.log(rows);
        res.status(201).send({ message: 'New item inserted', insertId: rows.insertId });
    } catch (error) {
        res.status(500).send({error});
    }
});

router.delete('/api/inventory/:id', async (req, res) => {
    // :id from URL can be accessed at req.params.id
    const id = req.params.id;
    try {
        let [rows] = await db.pool.query('DELETE FROM items WHERE id = ?', id);
        console.log(rows);
        if (rows.affectedRows > 0) { // find if any rows were affected (deleted)
            res.status(200).send({ message: 'Item deleted', deleteId: id });
        } else {
            res.status(404).send({ message: 'No item found with that id', targetId: id })
        }
    } catch (error) {
        res.status(500).send({error});
    }
});




module.exports = router;