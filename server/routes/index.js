var express = require('express');
var router = express.Router();
var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

router.get('/admin', function(req, res){
	res.sendFile(rootPath + 'public/admin.html');
});

// client catch all route
router.get('/*', function(req, res) {
	res.sendFile(rootPath + 'public/client.html', { user: req.user });
});

module.exports = router;

