USE inventory_app;
DROP TABLE users, items;

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
    num_count DECIMAL(8, 2), -- can hold up to number 999,999.99
    description VARCHAR(100),
    image_link VARCHAR(255),
    last_updated TIMESTAMP DEFAULT NOW()
);

INSERT INTO items (name, size, num_count, description)
VALUES
    ('Milk', '2L', 4, 'Milk for coffee'),
    ('Sausages', '6 pack', 1, 'Sausages for hot dogs'),
    ('Coffee beans', '1kg', 3, 'Coffee beans')
;