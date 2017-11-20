exports.db = function(){
    var conn = {
            connectionLimit: 10,
            host: '172.23.0.2',
            user: 'root',
            password: 'password',
            database: 'dockersetup'
    }
    return conn;
}