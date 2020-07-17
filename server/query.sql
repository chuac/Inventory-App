USE inventory_app;

-- All the items and their tags (when they have at least one tag)
SELECT items.name, item_tags.tag_id, tags.tag_name
FROM items
INNER JOIN item_tags
    ON items.id = item_tags.item_id
INNER JOIN tags
    ON item_tags.tag_id = tags.id;

-- Given an item's ID, find their associated tags
SELECT items.name,
    item_tags.tag_id,
    tags.tag_name
FROM items
    INNER JOIN item_tags ON items.id = item_tags.item_id
    INNER JOIN tags ON item_tags.tag_id = tags.id
WHERE items.id = 4;

-- See all tags (and their names) in the DB, and how many items they have associated with them
SELECT tags.id, tags.tag_name, COUNT(item_tags.item_id) AS 'Items with this tag'
FROM tags
LEFT JOIN item_tags
    ON tags.id = item_tags.tag_id
GROUP BY tags.id
ORDER BY 3 DESC;

-- ALL the items and if they have tags, then their tags (comma seperated if they have multiple tags), 
-- otherwise NULL if no tag
SELECT items.*,
    GROUP_CONCAT(item_tags.tag_id) AS 'grouped_tag_id',
    GROUP_CONCAT(tags.tag_name) AS 'grouped_tag_name'
FROM items
    LEFT JOIN item_tags ON items.id = item_tags.item_id
    LEFT JOIN tags ON item_tags.tag_id = tags.id
GROUP BY items.id
ORDER BY items.last_updated DESC;

