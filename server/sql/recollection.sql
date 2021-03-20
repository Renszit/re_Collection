DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset_codes;

CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      pass VARCHAR(255) NOT NULL,
      bio VARCHAR,
      url VARCHAR,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships(
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id) NOT NULL,
  recipient_id INT REFERENCES users(id) NOT NULL,
  accepted BOOLEAN DEFAULT false
);

INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (5,23,TRUE);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (5,21,TRUE);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (5,19,TRUE);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (5,100,TRUE);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (2,5,FALSE);