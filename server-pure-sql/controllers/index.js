var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      db.Message.findAll({include: [db.User, db.Room]})
        .then(function(messages) {
          formattedMsgs = messages.map(function(message) {
            return {
              createdAt: message.createdAt,
              msg_text: message.msg_text,
              id: message.id,
              roomname: message.Room.roomname,
              username: message.User.username
            }
          })
          messages = {}
          messages.results = formattedMsgs;
          res.json(messages);
        });
    },
    post: function (req, res) {
      db.Room.findOrCreate({
        where: {
          roomname: req.body.roomname
        }
      })
      .spread(function(room, created) {
        db.User.findOrCreate({
          where: {
            username: req.body.username
          }})
          .spread(function(user, created) {
            db.Message.create({
              UserId: user.get('id'),
              msg_text: req.body.msg_text,
              RoomId: room.get('id')
            }).then(function(message) {
              res.sendStatus(201);
            });
          });
      })

    }
  },

  users: {
    get: function (req, res) {
      db.User.findAll()
        .then(function(users) {
          res.json(users);
        });
    },
    post: function (req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
        .spread(function(user, created) {
          res.sendStatus(created ? 201 : 200);
        });
    }
  },

  rooms: {
    get: function (req, res) {
      db.Room.findAll()
        .then(function(rooms) {
          res.json(rooms);
        });
    },
    post: function (req, res) {
      db.Room.findOrCreate({where: {roomname: req.body.roomname}})
        .spread(function(room, created) {
          res.sendStatus(created ? 201 : 200);
        });
    }
  }
};
