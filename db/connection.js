const mysql = require('mysql2');
const chalk = require("chalk");
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'N0vember8!',
      database: 'boss'
    });
    console.log(chalk.blue.bold("==Connected to boss Database=="));
    module.exports = db;