var mongoose = require('mongoose');
mongoose.connect('mongodb://root:Kp2322014@localhost:27017/leaveForm?authSource=admin');
var Leave = mongoose.model('Leave' , {
	userId: String,
	name: String,
	date : String,
	reasons : String,
	status : String
});

var User = mongoose.model('User', {
	name: String,
	password: String,
	role: String
});

var Session = mongoose.model('Session', {
  userId:String,
  name: String,
  role: String,
  token: String
});

module.exports = {
	Session: Session,
	User:User,
	Leave:Leave
};

