const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const chalk = require("chalk");
const queries = require('./db/queries');
const db = require('./db/connection');

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
          viewEmployees();
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
        default:
          return console.log("No selection has been made");
      }
    })
    .catch((err) => console.log(chalk.bold.red("Error message: ", err)));
};
viewOptions();

const viewDepartments = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("\n");
    console.table(rows);
    return viewOptions();
  });
};

const viewEmployees = () => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("\n");
    console.table(rows);
    return viewOptions();
  });
};

const viewRoles = () => {
  const sql = `SELECT * FROM Roles`;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("\n");
    console.table(rows);
    return viewOptions();
  });
};

const addDepartment = () => {
  return inquirer.prompt([
    {
      type: "Insert",
      name: "Name",
      message: "What is the name of this department?",
      validate: nameInsert => {
        if (nameInsert) {
          return true;
        } else {
          console.log("Please enter a department name");
          return false;
        };
      }
    }
  ])
  .then(answer => {
    const sql = `INSERT INTO departments (name)
      VALUES (?)`;
    const params = answer.name;
    db.query(sql, params, (err) => {
      if (err) {
        throw err;
      }
      console.log("Department added");
      return viewDepartments();
    });
  });
};


const addRole = () => {
  return inquirer.prompt([
    {
      type: "Insert",
      name: "title",
      message: "What is the name of this role?",
      validate: nameInsert => {
        if (nameInsert) {
          return true;
        } else {
          console.log("Please enter a role name");
          return false;
        };
      }
    },
    {
      type: "Insert",
      name: "salary",
      message: "What is the salary for this role?",
      validate: salaryInsert => {
        if (isNaN(salaryInsert)) {
          console.log("Please enter a salary");
          return false;
        } else {
          return true;
        };
      }
    }
  ])
  .then (answer => {
    const params = [answer.title, answer.salary];
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      const departments = rows.map(({name, id}) => ({name: name, value: id}));
      inquirer.prompt([
        {
          type: "list",
          name: "department",
          message: "What department does this role belong to?",
          choices: departments
        }
      ])
      .then(departmentAnswer => {
        const department = departmentAnswer.department;
        params.push(department);
        const sql = `INSERT INTO roles (title, salary, department_id)
          VALUES (?, ?, ?)`;
        db.query(sql, params, (err) => {
          if (err) {
            throw err;
          }
          console.log("Role added");
          return viewRoles();
        });
      });
    });
  });
};

const addEmployee = () => {
  return inquirer.prompt([
    {
      type: "Insert",
      name: "firstName",
      message: "What is the employee's first name?",
      validate: nameInsert => {
        if (nameInsert) {
          return true;
        } else {
          console.log("Please enter a name");
          return false;
        };
      }
    },
    {
      type: "Insert",
      name: "lastName",
      message: "What is the employee's last name?",
      validate: nameInsert => {
        if (nameInsert) {
          return true;
        } else {
          console.log("Please enter a name");
          return false;
        };
      }
    }
  ])
  .then (answer => {
    const params = [answer.firstName, answer.lastName];
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      const roles = rows.map(({title, id}) => ({name: title, value: id}));
      inquirer.prompt([
        {
          type: "list",
          name: "role",
          message: "What is the role of this employee?",
          choices: roles
        }
      ])
      .then(roleAnswer => {
        const role = roleAnswer.role;
        params.push(role);
        const sql = `SELECT * FROM employees`;
        db.query(sql, (err, rows) => {
          if (err) {
            throw err;
          }
          const managers = rows.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
          managers.push({name: "No manager", value: null});
          inquirer.prompt([
            {
              type: "list",
              name: "manager",
              message: "Who is this employee's manager?",
              choices: managers
            }
          ])
          .then(managerAnswer => {
            const manager = managerAnswer.manager;
            params.push(manager);
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
              VALUES (?, ?, ?, ?)`;
            db.query(sql, params, (err) => {
              if (err) {
                throw err;
              }
              console.log("Employee added");
              return viewEmployees();
            });
          });
        });
      });
    });
  });
};

