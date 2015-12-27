var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(result) {
        var data = {};
        data.results = result;
        res.send(data);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var user = req.body.username;
      var room = req.body.roomname;
      var msg = req.body.text;

      models.users.post(user, function(uId) {
        userId = uId;
        models.rooms.post(room, function(rId) {
          roomId = rId;
          var msgData = [roomId, userId, msg];

          models.messages.post(msgData, function(mId) {
            res.send(mId);
          });
        });
      });
    }
  },

  users: {
    get: function (req, res) {
      models.users.get(res.send);
    },
    post: function (req, res) {
      models.users.post(req.body.username, function(uId) {
        res.send(uId);
      });
    }
  },

  rooms: {
    get: function (req, res) {
      models.rooms.get(res.send);
    },
    post: function (req, res) {
      models.rooms.post(req.body.roomname, function(uId) {
        res.send(uId);
      });
    }
  }
};

