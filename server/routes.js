/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH PAGE.  THIS IS ONE WAY OF DOING IT. YOU COULD ALSO SET CONTROLLERS FOR THE PAGE AREAS LIKE USER CONTROLLER AND ADMIN CONTROLLER. */
	home = require('../controllers/user/home');
	

module.exports = function(app){
	/* GET STATEMENTS */
	router.get('/', home.index);
	router.get('/addnameform', home.addnameform);
	router.get('/updatedeletelist', home.updatedeletelist);
	
	/* POST STATEMENTS */
	router.post('/addname', home.addname);
	router.post('/updatedeletename', home.updatedeletename);

	app.use(router);
}
