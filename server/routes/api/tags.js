const express = require('express');

const db = require('../mysql');
const { getTags,
        getItemsHavingTag,
        addOneItemAndTagRelation
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

// POST new tag relation(s) for an item, tag_ids can be an array of multiple tags to add relations for
router.post('/api/tags/inventory', async (req, res) => {
    const { item_id, tags_to_add } = req.body; // all form data is contained inside req.body

    let success = true;
    for (let tag of tags_to_add) {
        try {
            await addOneItemAndTagRelation(item_id, tag);
        } catch (error) {
            success = false;
            res.status(500).send({ error: error.message });
            break; // break out of the loop on the tags_to_add since we already caught one error
        }
    }
    if (success) {
        res.status(201).send({ message: 'New item and tag relation(s) inserted', item_id, tags_added: tags_to_add }); // only send a 201 status if no errors were thrown (i.e, all tags inserted ok)
    }
});


module.exports = router;