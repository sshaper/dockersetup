exports.db = function(){
    var conn = {
            connectionLimit: 10,
            host: '172.22.0.2',
            user: 'root',
            password: 'password',
            database: 'docker_test'
    }
    return conn;
}