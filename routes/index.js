
const express = require('express');
const router = express.Router();
const inquirer = require("inquirer");
const cTable = require("console.table");

router.use(require('./rolesRoutes'));
router.use(require('./departmentRoutes'));
router.use(require('./employeeRoutes'));

module.exports = router;