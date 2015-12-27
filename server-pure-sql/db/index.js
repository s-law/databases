var Sequelize = require("sequelize");
var db = new Sequelize("chat", "root", "mypw");

var User = db.define('User', {
  username: Sequelize.STRING
}, {
  timestamps: false
});

var Room = db.define('Room', {
  roomname: Sequelize.STRING
}, {
  timestamps: false
})

var Message = db.define('Message', {
  msg_text: Sequelize.STRING,
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  }
}, {
  timestamps: true,
  updatedAt: false
});

Message.belongsTo(User);
User.hasMany(Message);
Message.belongsTo(Room);
Room.hasMany(Message);

User.sync();
Room.sync();
Message.sync();

exports.User = User;
exports.Room = Room;
exports.Message = Message;
