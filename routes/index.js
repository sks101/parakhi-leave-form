var express = require('express');
var router = express.Router();

var Model = require('../models/model');



function randString(x) {
	var s = "";
	while (s.length < x && x > 0) {
		var r = Math.random();
		s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
	}
	return s;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/leaves', function(req, res, next){
	var left = new Model.Leave({
		userId: req.body.leave.userId,
		name: req.body.leave.name,
		date : req.body.leave.date,
		reasons : req.body.leave.reasons,
		status : "On process"
	});
	left.save(function(err, result){
		if(err){
			res.json({success:false},404);
		}else{
			res.json({leave : result});
		}
	})
});
router.get('/leaves', function(req, res, next){
	Model.Leave.find({userId: req.query.userId}, function (err, result){

		if(err){
			
		}
		res.json({leave:result});
			
	});
});

router.delete('/leaves/:id', function(req, res, next){
	Model.Leave.remove({_id: req.params.id}, function(err, result){
		if(err){
			throw err;
		}
		res.json({});
	})
})

router.put('/leaves/:id', function(req, res, next){

	console.log(req.params.id, "mark 1");

	console.log(req.body);
	Model.Leave.findOneAndUpdate({_id: req.params.id},req.body.leave, {new:true}, function(err, result){
		res.json({leave:result});
	})
});


router.get('/leaves/:id', function(req, res, next){

	Model.Leave.findOne({_id: req.params.id}, function(err, result){
		res.json({leave:result});
	})
});

router.post('/login', function(req, res, next){
	
	var username = req.body.username;
	var password = req.body.password;

	console.log(username);

	Model.User.findOne({name:username }, function(err, result){
		if(result.password == password){
			var session = new Model.Session({
				userId : result._id,
				name:  result.name,
				role: result.role,
				token: randString(4)+"-"+randString(4)+"-"+randString(4)

			});
			session.save(function(err, result){
				res.json(result);
			})
		}
	})

});



module.exports = router;
