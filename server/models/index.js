var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT msg_text FROM messages', function(err, result, fields)
        {
          callback(result);
        });
    }, // a function which produces all the messages
    post: function (callback) {
      db.query('INSERT INTO messages VALUES' , function(err, result, fields)
        {
          // the above needs arguments in the sqlstring with values array [s1, s2, s3...]
          callback(result.insertId);
        });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {

    },
    post: function (username, callback) {
      db.query('INSERT INTO users VALUES' , function(err, result, fields)
        {
          // the above needs arguments in the sqlstring with values array [s1, s2, s3...]
          callback(result.insertId);
        });
    }
  },

  rooms: {
    // Ditto as above.
    get: function (callback) {

    },
    post: function (roomname, callback) {
      db.query('INSERT INTO rooms VALUES' , function(err, results, fields)
        {
          // the above needs arguments in the sqlstring with values array [s1, s2, s3...]
          callback(result.insertId);
        });

    }
  }
};

