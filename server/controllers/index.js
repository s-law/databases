var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(res.send);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      req.on('data', function(data) {
        var user = data.username;
        var userId;
        var room = data.roomname;
        var roomId;
        var msg = data.message;

        models.username.post(user, function(uId) {
          userId = uId;
        });
        models.roomname.post(room, function(rId) {
          roomId = rId;
        });
        models.messages.post(msg, userId, roomId, function(mId) {
          res.send(msgId);
        });
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.messages.get()
    },
    post: function (req, res) {
      models.messages.post()
    }
  }
};

