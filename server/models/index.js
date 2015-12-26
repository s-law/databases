var db = require('../db').connection;

module.exports = {
  messages: {
    get: function (callback) {
      db.query('select rooms.roomname, messages.id, messages.createdAt, users.username, messages.msg_text FROM rooms INNER JOIN users INNER JOIN messages ON (rooms.id = messages.roomname AND users.id = messages.username)', function(err, result)
        {
          callback(result);
        });
    },
    post: function (msgData, callback) {
      db.query('INSERT INTO messages (roomname, username, msg_text) VALUES ?', [[msgData]] , function(err, result)
        {
          callback(result.insertId);
        });
    }
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
        result = result.map(function(element) {
          return element.username;
        });
        var nameIndex = result.indexOf(username);
        if (nameIndex === -1) {
          var sqlstr = 'INSERT INTO users (username) VALUES (\'' + username + '\')';
          db.query(sqlstr , function(err, result)
            {
              callback(result.insertId);
            });
        } else {
          callback(nameIndex+1);
        }
      });
    }
  },

  rooms: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT roomname FROM rooms', function(err, result)
        {
          callback(result);
        });
    },
    post: function (roomname, callback) {
      module.exports.rooms.get(function(result) {
        result = result.map(function(element) {
          return element.roomname;
        });
        var roomIndex = result.indexOf(roomname);
        if (roomIndex === -1) {
          var sqlstr = 'INSERT INTO rooms (roomname) VALUES (\'' + roomname + '\')';
          db.query(sqlstr , function(err, result)
            {
              callback(result.insertId);
            });
        } else {
          callback(roomIndex+1);
        }
      });
    }
  }
};

