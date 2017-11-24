//import read from 'fs';

/* I NEED TO REQUIRE THE DB FILE FOR MY DATABASE CONNECTION */
var db = require('../../server/db'),
	runsql = require('../../modules/runsql'),
    mysql = require('mysql'),
	/* I NEED TO CREATE THE CONNECTION HERE (INSTEAD OF IN MODULE EXPORTS) OTHERWISE I WILL CREATE TOO MANY CONNECTIONS WHEN TOO MANY CONCURRENT USERS ACCESS THE DATABASE */
	pool = db.connect(),
	bcrypt = require('bcrypt');

module.exports = {
	index: function(req, res){
		res.render('user/login',{title: 'Login', heading: 'Login', nav: false});
	},

	login: function(req, res){
		data = JSON.parse(req.body.data);
		sql = "SELECT username, password FROM admin WHERE username = ?";
		inserts = [data.username];
		sql = mysql.format(sql, inserts);
		var result;
		runsql.runsql(pool, sql, function(result){
			if(result.length === 0){
				res.send('loginNoInfo');
			}
			else {
				bcrypt.compare(data.password, result[0].password, function(err, result) {
					if(err){
						res.send('loginError');
					}
					else {
						/* CREATE SESSION */
						var sessData = req.session;
						sessData.access = "accessGranted";
						res.send('loginSuccess')
					}
				});
			}
		}, inserts);
	},
	
	/*THIS PROVIDES THE CONTENT FOR THE HOME PAGE*/
    home: function(req, res){
		/* IF A SESSION IS NOT CREATED THEN THE WILL BE DIRECTED TO THE LOGIN PAGE. */
		if(req.session.access !== "accessGranted"){
			res.render('user/login',{title: 'Login', heading: 'Login', nav: false});
		}
		else{
			var someAttribute = req.session.someAttribute;
			pool.getConnection(function(err, connection){
				if(err){
					console.log(err);
				}
				else {
					/* I HAVE TO USE ?? FOR THE INDENTIFIERS AND ? FOR THE VALUES */
					var sql = "SELECT firstname, lastname FROM ??";
					var inserts = ['name'];
					/* THIS BINDS THE ARRAY VALUES FROM INSERTS TO THE SQL STATEMENT THE PURPOSE OF BINDING IS TO PREVENT SQL INJECTIONS. NOTE: IN THIS CASE BECAUSE NONE OF THE VALUES WERE BEING ENTERED BY THE USER I DID NOT HAVE TO BIND THE SQL STATEMENT BUT I WANTED TO SHOW AND EXAMPLE OF IT. */
					sql = mysql.format(sql, inserts);
					connection.query(sql, function(error, results, fields){
						if(error){
							console.log(error);
						}
						else {
							var output = '<ul>';
							var i = 0;
							while(i < results.length){
								output += '<li>' + results[i].firstname + " " + results[i].lastname + "</li>";
								i++;
							}

							output += '</ul>';
							
							res.render('user/home',{pageData: output, title: 'Home Page', heading: 'Home Page', nav: true});
							connection.release();

							/* HANDLE ERROR AFTER RELEASE*/
							if(error) throw error;
						}
					});
				}
			});
		}//end else
	},
	addnameform: function(req, res){
		if(req.session.access !== "accessGranted"){
			res.render('user/login',{title: 'Login', heading: 'Login', nav: false});
		}
		else{
			res.render('user/addname',{title: 'Add Name', heading: 'Add Name',nav: true});
		}
	},
	addname: function(req, res){
		/* THE DATA COMES BACK AS AN OBJECT WITH A DATA PROPERTY THAT CONTAINS A JSON STRING.  I HAVE TO PARSE THE STRING TO GET AN OBJECT */
		data = JSON.parse(req.body.data);
		var sql = "INSERT INTO name (firstname, lastname) VALUES (?,?)";
		var inserts = [data.fname, data.lname];
		/* THIS BINDS THE ARRAY VALUES FROM INSERTS TO THE SQL STATEMENT THE PURPOSE OF BINDING IS TO PREVENT SQL INJECTIONS. NOTE: IN THIS CASE BECAUSE NONE OF THE VALUES WERE BEING ENTERED BY THE USER I DID NOT HAVE TO BIND THE SQL STATEMENT BUT I WANTED TO SHOW AND EXAMPLE OF IT. */
		sql = mysql.format(sql, inserts);
		pool.getConnection(function(err, connection){
			connection.query(sql, function(error, results, fields){
				if(error){
					res.send("error");
				}
				else {
					res.send("addname");
				}
			});
		});
	},
	updatedeletelist: function(req, res){
		if(req.session.access !== "accessGranted"){
			res.render('user/login',{title: 'Login', heading: 'Login', nav: false});
		}
		else{
			pool.getConnection(function(err, connection){
				if(err){
					console.log(err);
				}
				else {
					/* I HAVE TO USE ?? FOR THE INDENTIFIERS AND ? FOR THE VALUES */
					var sql = "SELECT id, firstname, lastname FROM ??";
					var inserts = ['name'];
					/* THIS BINDS THE ARRAY VALUES FROM INSERTS TO THE SQL STATEMENT THE PURPOSE OF BINDING IS TO PREVENT SQL INJECTIONS. NOTE: IN THIS CASE BECAUSE NONE OF THE VALUES WERE BEING ENTERED BY THE USER I DID NOT HAVE TO BIND THE SQL STATEMENT BUT I WANTED TO SHOW AND EXAMPLE OF IT. */
					sql = mysql.format(sql, inserts);
					connection.query(sql, function(error, results, fields){
						if(error){
							console.log(error);
						}
						else {
							var output = '<table class="table table-bordered" id="updatedeletetable"><tr><thead><th>First Name</th><th>Last Name</th><th>Update</th><th>Delete</th></thead><tbody>';
							var i = 0;
							while(i < results.length){
								output += '<tr>';
								output += '<td><input type="text" class="form-control" id="fname" value="' + results[i].firstname + '"</td>';
								output += '<td><input type="text" class="form-control" id="lname" value="' + results[i].lastname + '"</td>';
								output += '<td><input type="button" class="btn btn-success" value="Update" id="u' + results[i].id + '"></td>';
								output += '<td><input type="button" class="btn btn-danger" value="Delete" id="d' + results[i].id + '"></td>';
								output += '</tr>';
								i++;
							}

							output += '</tbody></table>';
							
							res.render('user/updatedeletename',{pageData: output, title: 'Update Delete Name', heading: 'Update Delete Name', nav: true});
							connection.release();

							/* HANDLE ERROR AFTER RELEASE*/
							if(error) throw error;
						}
					});
				}
			});
		} //end else
	},
	updatedeletename: function(req, res){
		var data = JSON.parse(req.body.data);
		if(data.flag === "delete"){
			var sql = "DELETE FROM name WHERE id=?";
			var inserts = [data.id];
			sql = mysql.format(sql, inserts);
			pool.getConnection(function(err, connection){
				if(err){
					console.log(err);
				}
				else {
					connection.query(sql, function(error, results, fields){
						if(error){
							res.send('error');
						}
						else {
							res.send('deleted');
						}
					});
				}
			});

		}
		else if(data.flag === 'update'){
			var sql = "UPDATE name SET firstname=?, lastname=? WHERE id=?";
			var inserts = [data.fname, data.lname, data.id];
			sql = mysql.format(sql, inserts);
			pool.getConnection(function(err, connection){
				if(err){
					console.log(err);
				}
				else {
					connection.query(sql, function(error, results, fields){
						if(err){
							res.send("error");
						}
						else {
							res.send("updated")
						}
					});
				}
			});
		}
	},
	logout: function(req, res){
		req.session.destroy(function(err) {
			if(err){
				console.log(err);
			}
			else {
				res.render('user/login',{title: 'Login', heading: 'Login', nav: false});
			}
		});
	}
}
