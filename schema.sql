USE inventory_app;
DROP TABLE users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100),
    password_hash VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

