var mysql = require('mysql');
var conn = require('/usr/src/app/model/db');
var conn_obj = conn.db();

/* THIS IS A SIMPLE MODULE THAT PROVIDES A FUNCTION THAT WILL CREATE A POOL CONNECTION TO A DATABASE. */
exports.connect = function(){
	var pool = mysql.createPool(conn_obj);
	return pool;
};
