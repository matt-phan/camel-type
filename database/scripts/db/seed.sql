-- Drop entire schema if exists and recreate it
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

-- Creating users table
CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at BIGINT NOT NULL DEFAULT date_part('epoch', now())
);

-- Creating races table
CREATE TABLE races (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    quote_id VARCHAR(100) NOT NULL,
    wpm INT NOT NULL,
    accuracy INT NOT NULL,
    milliseconds_elapsed INT NOT NULL,
    created_at BIGINT NOT NULL DEFAULT date_part('epoch', now()),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Inserting dummy data into users table
INSERT INTO users (name)
VALUES
('Elon Musk'),
('Jeff Bezos'),
('Elizabeth Holmes'),
('Satoshi Nakamoto');

-- Inserting dummy data into races table
INSERT INTO races (user_id, quote_id, wpm, accuracy, milliseconds_elapsed)
VALUES
(1, 'rAIJZHn5TH', 77, 99, 16000),
(1, '4zzDULN1Lx', 88, 96, 10000),
(2, 'e1la14gLuob', 160, 89, 5000),
(2, '5WcShwDrbL3', 55, 99, 22000),
(4, 'z6qESmmSnsFH', 223, 99, 4000);


