USE inventory_app;
DROP TABLE items, tags, item_tags;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    size VARCHAR(100),
    size_unit VARCHAR(100),
    num_count DECIMAL(8, 2), -- can hold up to number 999,999.99
    threshold DECIMAL(8, 2),
    description VARCHAR(100),
    image_link VARCHAR(255),
    last_updated TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE item_tags (
    item_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY(item_id) REFERENCES items(id),
    FOREIGN KEY(tag_id) REFERENCES tags(id),
    PRIMARY KEY (item_id, tag_id)
);

INSERT INTO items (name, size, size_unit, num_count, description)
VALUES
    ('Milk', '2', 'L', 4, 'Milk for coffee'),
    ('Sausages', '1', '6-pack', 1, 'Sausages for hot dogs'),
    ('Coffee beans', '1', 'kg', 3, 'Coffee beans'),
    ('Jack Daniels', '1', 'carton(s)', 3, 'JD')
;

INSERT INTO tags (tag_name)
VALUES
    ('Alcohol'),
    ('Groceries'),
    ('Drinks'),
    ('Cue Accessories')
;

INSERT INTO item_tags (item_id, tag_id)
VALUES
    (1, 2), -- Milk with #Groceries
    (2, 2),
    (3, 2),
    (4, 1),
    (4, 3)
;