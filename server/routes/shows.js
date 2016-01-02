var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Show = mongoose.model('Show');

router.get('/', function(req, res){
	Show.find({}, function(err, shows){
		res.json(shows);
	});
});

router.post('/', function(req, res){
	var title = req.body.title,
		date = req.body.date;
	// add show
	var newShow = new Show({
		title: title,
		date: date
	});

	newShow.save(function(err){
		if(err) throw err;

		res.redirect('/admin');
		// res.sendFile(rootPath + 'public/admin.html', {
		// 	success: true,
		// 	message: 'Successfully added show!',
		// 	show: newShow
		// });
	});
});

module.exports = router;