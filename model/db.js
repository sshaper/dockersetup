/* THIS CONTAINS THE DATABASE CONNECTION INFO.  THE REASON I PUT IT IN A SEPERATE FILE IS SO THIS INFORMATION COULD BE MOVED OUTSIDE OF THE WEB ONLY FOLDER (THIS IS DONE FOR SECURITY REASONS).  ANOTHER REASON IS I CAN EASILY CHANGE THIS INFORMATION IF THE DATABASE IS CHANGED.*/ 
exports.db = function(){
    var conn = {
            connectionLimit: 10,
            host: '172.19.0.2',
            user: 'root',
            password: 'password',
            database: 'dockersetup'
    }
    return conn;
}