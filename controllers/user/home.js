/* I NEED TO REQURIE THE DB FILE FOR MY DATABASE CONNECTION */
var db = require('../../server/db'),
    mysql = require('mysql'),
	/* I NEED TO CREATE THE CONNECTION HERE (INSTEAD OF IN MODULE EXPORTS) OTHERWISE I WILL CREATE TOO MANY CONNECTIONS WHEN TOO MANY CONCURRENT USERS ACCESS THE DATABASE */
	pool = db.connect();

module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
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

        
    }
}
