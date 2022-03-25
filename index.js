//const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const chalk = require("chalk");
const queries = require('./db/queries');
const db = require('./db/connection');

function viewDepartment() {
  sql
    .getDepartments()
    .then(([rows]) => {
      console.log("\n");
      console.log(chalk.blue(cTable.getTable(rows)));
    })
    .then(() => {
      viewOptions();
    })
    .catch((err) => console.log(chalk.bold.red("Error message: ", err)));
}

function viewAllEmployees() {
  sql
    .getAllEmployees()
    .then(([rows]) => {
      console.log("\n");
      console.log(chalk.green(cTable.getTable(rows)));
    })
    .then(() => {
      viewOptions();
    })
    .catch((err) => console.log(chalk.bold.red("Error message: ", err)));
}

function viewRoles() {
  sql
    .getRoles()
    .then(([rows]) => {
      console.log("\n");
      console.log(chalk.yellow(cTable.getTable(rows)));
    })
    .then((result) => {
      viewOptions();
      return result;
    })
    .catch((err) => console.log(chalk.bold.red("Error message: ", err)));
}

async function addDepartment() {
  const department = await inquirer.prompt([
    {
      name: "name",
      message: "What is the name of the department?",
      validate: (name) => {
        if (name) {
          return true;
        } else {
          console.log(chalk.red("You need to enter a Department"));
          return false;
        }
      },
    },
  ]);

  await sql.addDepartment(department);

  viewOptions();
}

async function addRole() {
  const role = await inquirer.prompt([
    {
      name: "title",
      message: "Please enter the Job Title",
      validate: (title) => {
        if (title) {
          return true;
        } else {
          console.log(chalk.red("You need to enter a Job Title"));
          return false;
        }
      },
    },
    {
      name: "salary",
      message: "Please enter the salary?",
      validate: (salary) => {
        if (salary) {
          return true;
        } else {
          console.log(chalk.red("You need to enter a Salary"));
          return false;
        }
      },
    },
    {
      name: "department_id",
      message: "Please enter the department this role belong to (1 - 6)?",
      validate: (department_id) => {
        if (department_id) {
          return true;
        } else {
          console.log(chalk.red("You need to enter a Department"));
          return false;
        }
      },
    },
  ]);
  await sql.addRole(role);

  viewOptions();
}

async function addEmployee() {
  const employee = await inquirer.prompt([
    {
      name: "first_name",
      message: "Please enter a First Name",
      validate: (first_name) => {
        if (first_name) {
          return true;
        } else {
          console.log(chalk.red("You need to enter a First Name"));
          return false;
        }
      },
    },
    {
      name: "last_name",
      message: "Please enter Last Name",
      validate: (last_name) => {
        if (last_name) {
          return true;
        } else {
          console.log(chalk.red("You need to enter a Last Name"));
          return false;
        }
      },
    },
    {
      name: "role_id",
      message: "Please select a role from (1 - 4)",

      validate: (role_id) => {
        if (role_id) {
          return true;
        } else {
          console.log(chalk.red("You need to enter a Role"));
          return false;
        }
      },
    },

    {
      name: "manager_id",
      message: "Please select a manager for the employee. Type (1-5)?",

      validate: (manager_id) => {
        if (manager_id) {
          return true;
        } else {
          console.log(chalk.red("You need to enter a Manager"));
          return false;
        }
      },
    },
  ]);
  await sql.addEmployee(employee);

  viewOptions();
}

async function updateEmployeeRole() {
  const employee = await inquirer.prompt([
    {
      name: "id",
      message: "Please enter Employee ID",
      validate: (id) => {
        if (id) {
          return true;
        } else {
          console.log(chalk.red("You need to enter an Employee ID"));
          return false;
        }
      },
    },
    {
      name: "role_id",
      message: "Please select a role from (1 - 5)",

      validate: (role_id) => {
        if (role_id) {
          return true;
        } else {
          console.log(chalk.red("You need to enter a Role"));
          return false;
        }
      },
    },
  ]);
  await sql.updateEmployeeRole(employee);

  viewOptions();
}

// BONUS PART
async function deleteEmployee() {
  const employee = await inquirer.prompt([
    {
      name: "id",
      message: "Please enter Employee ID you want to DELETE",
      validate: (id) => {
        if (id) {
          return true;
        } else {
          console.log(chalk.red("You need to enter an Employee ID"));
          return false;
        }
      },
    },
  ]);
  await sql.deleteEmployee(employee);

  viewOptions();
}

async function updateEmployeeManager() {
  const employee = await inquirer.prompt([
    {
      name: "id",
      message: "Please enter Employee ID to update",
      validate: (id) => {
        if (id) {
          return true;
        } else {
          console.log(chalk.red("You need to enter an Employee ID"));
          return false;
        }
      },
    },
    {
      name: "manager_id",
      message: "Please select a Manager from (1 - 5)",

      validate: (manager_id) => {
        if (manager_id) {
          return true;
        } else {
          console.log(chalk.red("You need to enter a Role"));
          return false;
        }
      },
    },
  ]);
  await sql.updateEmployeeManager(employee);

  viewOptions();
}

const viewOptions = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "options",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        //BONUS PART
        "Remove an Employee",
        "Update Employee Manager",
      ],
    })
    .then((data) => {
      switch (data.options) {
        case "View all departments": {
          viewDepartments();
          break;
        }
        case "View all roles": {
          viewRoles();
          break;
        }
        case "View all employees": {
          viewAllEmployees();
          break;
        }
        case "Add a department": {
          addDepartment();
          break;
        }
        case "Add a role": {
          addRole();
          break;
        }
        case "Add an employee": {
          addEmployee();
          break;
        }
        case "Update an employee role": {
          updateEmployeeRole();
          break;
        }
        case "Remove an Employee": {
          deleteEmployee();
          break;
        }
        case "Update Employee Manager": {
          updateEmployeeManager();
          break;
        }
        default:
          return console.log("No selection has been made");
      }
    })
    .catch((err) => console.log(chalk.bold.red("Error message: ", err)));
};
viewOptions();