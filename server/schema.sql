CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  id INT,
  name VARCHAR(32),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT,
  name VARCHAR(32),
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id INT,
  room_id INT,
  user_id INT,
  msg_text VARCHAR(140),
  createdAt TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (room_id)
    REFERENCES rooms(id),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

