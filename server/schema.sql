CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(32),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(32),
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  roomname INT,
  username INT,
  msg_text VARCHAR(140),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,/* should automatically add timestamp as data is entered*/
  PRIMARY KEY (id),
  FOREIGN KEY (roomname)
    REFERENCES rooms(id),
  FOREIGN KEY (username)
    REFERENCES users(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

