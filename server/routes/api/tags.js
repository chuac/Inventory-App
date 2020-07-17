const express = require('express');

const db = require('../mysql');
const { getTags,
        getItemsHavingTag
    } = require('../mysql');

const router = express.Router();


// GET all tags, and their tag ID, ordered by how many items are associated with each tag.. Maybe we should only get tags that have items associated with them?
router.get('/api/tags/inventory', async (req, res) => {
    try {
        let rows = await getTags();
        if (rows.length > 0) { // found at least one item
            res.send(rows);
        } else {
            res.send([])
        }
    } catch (error) {
        res.status(500).send({ error });
    }
});

// GET all items that have this specific tag
router.get('/api/tags/inventory/:tag', async (req, res) => {
    // :id from URL can be accessed at req.params.id
    const tag = req.params.tag;
    try {
        let rows = await getItemsHavingTag(tag);
        if (rows.length > 0) { // found at least one item
            res.send(rows);
        } else {
            res.status(404).send({ message: 'No items found with that tag' })
        }
    } catch (error) {
        res.status(500).send({ error });
    }
});


module.exports = router;