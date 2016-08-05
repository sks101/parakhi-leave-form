var mongoose = require('mongoose');
mongoose.connect('mongodb://root:Kp2322014@localhost:27017/leaveForm?authSource=admin');

var Session = mongoose.model('Session', {
  userId:String,
  name: String,
  role: String,
  token: String
});

module.exports = {
	Session: Session
}