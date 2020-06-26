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
    num_count DECIMAL(8, 2), -- can hold up to 999,999.99
    description VARCHAR(100),
    image_link VARCHAR(255),
    last_updated TIMESTAMP DEFAULT NOW()
);