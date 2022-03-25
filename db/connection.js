const mysql = require('mysql2');
const chalk = require("chalk");
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'N0vember8!',
      database: 'business'
    });
    console.log(chalk.blue.bold("==Connected to business Database=="));
    module.exports = db;