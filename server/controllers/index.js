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


      // req.on('data', function(data) {
      //   console.log(data);
      //   var userId;
      //   var roomId;

      // });
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

