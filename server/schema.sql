CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(32),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(32),
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  RoomId INT,
  UserId INT,
  msg_text VARCHAR(140),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,/* should automatically add timestamp as data is entered*/
  PRIMARY KEY (id),
  FOREIGN KEY (RoomId)
    REFERENCES rooms(id),
  FOREIGN KEY (UserId)
    REFERENCES users(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

