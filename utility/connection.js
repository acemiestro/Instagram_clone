var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'paarth0303', // db password
    database: 'insta' // db instance name 
})

connection.connect();
console.log("connected to db");

module.exports = connection;