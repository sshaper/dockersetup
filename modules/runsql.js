/* THIS IS A CUSTOM MODULE THAT QUERIES BASED UPON WHAT IS SENT.  THE FOLLOWING IS A DESCRIPTION OF THE PARAMETERS
POOL - PASSES THE POOL INSTANCE FROM THE PAGE THAT IS REQUESTING THE QUERY, IN THIS CASE THE HOME.JS PAGE
SQL - SQL THAT WILL BE RUN
CB - CALLBACK FUNCTION WITH THE RESULT.

*/
exports.runsql = function(pool, sql, cb){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
        }
        else {
             connection.query(sql, function(error, results, fields){
                if(error){
                    console.log(error);
                }
                else {
                    cb(results);
                }
            });
        }
    });
}


