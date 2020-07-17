const express = require('express');

const db = require('../mysql');
const { getAll,
        getAllWithTags } = require('../mysql');

const router = express.Router();

// GET all items, ordered by last_updated
router.get('/api/inventory', async (req, res) => {
    // try {
    //     let [rows] = await db.pool.query('SELECT * FROM items ORDER BY last_updated DESC');
    //     if (rows.length > 0) { // found at least one item
    //         console.log('Someone requested a GET');
    //         res.send(rows);
    //     } else {
    //         res.send([]);
    //     }
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send({ message: 'Something went wrong', error});
    // }
    try {
        let rows = await getAllWithTags();
        for (let row of rows) {
            console.log(row);
        }
        if (rows.length > 0) { // found at least one item
            console.log('Someone requested a GET');
            res.send(rows);
        } else {
            res.send([]);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong', error});
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
    const { name, size, size_unit, num_count, threshold, description } = req.body; // all form data is contained inside req.body
    
    const values = [name, size, size_unit, num_count, threshold, description ];

    try {
        let [rows] = await db.pool.query('INSERT INTO items(name, size, size_unit, num_count, threshold, description) VALUES(?)', [values]);
        
        console.log(rows);
        res.status(201).send({ message: 'New item inserted', insertId: rows.insertId });
    } catch (error) {
        res.status(500).send({error});
    }
});

// UPDATE/PUT an existing item
router.put('/api/inventory/:id', async (req, res) => {
    const id = req.params.id;
    const { name, size, size_unit, num_count, threshold, description } = req.body; // all form data is contained inside req.body

    const values = [ name, size, size_unit, num_count, threshold, description, id ];
    try {
        const query = 
            `UPDATE items
            SET name = ?,
                size = ?,
                size_unit = ?,
                num_count = ?,
                threshold = ?,
                description = ?,
                last_updated = NOW()
            WHERE id = ?`
        let [rows] = await db.pool.query(query, values);

        console.log(rows);
        res.status(200).send({ message: 'Item updated', affectedId: id });
    } catch (error) {
        res.status(500).send({error});
    }
});

// DELETE an existing item
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