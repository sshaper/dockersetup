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


