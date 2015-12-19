var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(result) {
        console.log(result);
        var data = {};
        data.results = result;
        res.send(data);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      req.on('data', function(data) {
        var userId;
        var roomId;

        models.users.post(data.username, function(uId) {
          userId = uId;
        });
        models.rooms.post(data.roomname, function(rId) {
          roomId = rId;
        });

        var msgData = [roomId, userId, data.message];

        models.messages.post(msgData, function(mId) {
          res.send(mId);
        });
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(res.send);
    },
    post: function (req, res) {
      req.on('data', function(data){

        models.users.post(data.username, function(uId) {
          res.send(uId);
        });
      });
    }
  },

  rooms: {
    // Ditto as above
    get: function (req, res) {
      models.rooms.get(res.send);
    },
    post: function (req, res) {
      req.on('data', function(data){

        models.rooms.post(data.roomname, function(uId) {
          res.send(uId);
        });
      });
    }
  }
};

