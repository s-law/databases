var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('select msg_text from messages', function(err, results, fields)
        {
          console.log(results);
          console.log(fields);
        });
    }, // a function which produces all the messages
    post: function (callback) {
      db.query('insert into messages values', function(err, results, fields)
        {
          // the above needs arguments in the sqlstring with values (s1, s2, s3...)
          console.log(results);
          console.log(fields);
        });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {

    },
    post: function (callback) {

    }
  }
};

