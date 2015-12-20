var db = require('../db').connection;

module.exports = {
  messages: {
    get: function (callback) {
      db.query('select rooms.roomname, users.username, messages.msg_text FROM rooms INNER JOIN users INNER JOIN messages ON (rooms.id = messages.roomname AND users.id = messages.username)', function(err, result)
        {
          callback(result);
        });
    }, // a function which produces all the messages
    post: function (msgData, callback) {
      db.query('INSERT INTO messages (roomname, username, msg_text) VALUES ?', [[msgData]] , function(err, result)
        {
          // the above needs arguments in the sqlstring with values array [s1, s2, s3...]
          console.log('you are here');
          callback(result.insertId);
        });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT username FROM users', function(err, result)
        {
          callback(result);
        });
    },
    post: function (username, callback) {
      module.exports.users.get(function(result) {
        result.map(function(element) {
          return element.username;
        });
        console.log(result);
        if ('lk') {
          var sqlstr = 'INSERT INTO users (username) VALUES (\'' + username + '\')';
          db.query(sqlstr , function(err, result)
            {
              callback(result.insertId);
            });
        } else {

        }
        
      });
    }
  },

  rooms: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT roomname FROM rooms', function(err, result)
        {
          console.log('hello')
          callback(result);
        });
    },
    post: function (roomname, callback) {
      var sqlstr = 'INSERT INTO rooms (roomname) VALUES (\'' + roomname + '\')';
      db.query(sqlstr , function(err, result)
        {
          callback(result.insertId);
        });

    }
  }
};

