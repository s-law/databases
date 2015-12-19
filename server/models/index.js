var db = require('../db').connection;

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT username, msg_text FROM messages', function(err, result)
        {
          callback(result);
        });
    }, // a function which produces all the messages
    post: function (msgData, callback) {
      db.query('INSERT INTO messages (roomname, username, msg_text) VALUES ?', [msgData] , function(err, result)
        {
          // the above needs arguments in the sqlstring with values array [s1, s2, s3...]
          callback(result.insertId);
        });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT name FROM users', function(err, result)
        {
          callback(result);
        });
    },
    post: function (username, callback) {
      db.query('INSERT INTO users (name) VALUES (' + username + ')' , function(err, result)
        {
          // the above needs arguments in the sqlstring with values array [s1, s2, s3...]
          callback(result.insertId);
        });
    }
  },

  rooms: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT name FROM rooms', function(err, result)
        {
          callback(result);
        });
    },
    post: function (roomname, callback) {
      db.query('INSERT INTO rooms (name) VALUES (' + roomname + ')', function(err, result)
        {
          // the above needs arguments in the sqlstring with values array [s1, s2, s3...]
          callback(result.insertId);
        });

    }
  }
};

